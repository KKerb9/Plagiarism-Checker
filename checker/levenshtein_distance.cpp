#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <set>

using namespace std;
using ll = long long;

map<char, ll> weight = {
    {'D', 1}, // delete
    {'I', 1}, // insert
    {'R', 1}, // replace
    {'M', 0}  // nothing
};
vector<set<char>> sep = {
    {},
    {' '},
    {'.', '!', '?'},
    {'\n'}
};

vector<string> _parce(string &s, int level) {
    vector<string> res;
    int n = s.length();
    if(level == 0) {
        res.resize(n);
        for(int i = 0; i < n; i++) {
            res[i] += s[i];
        }
    }
    else {
        for(int i = 0; i < n; i++) {
            string elem;
            for(; i < n && sep[level].count(s[i]) == 0; i++) {
                elem += s[i];
            }
            res.push_back(elem);
        } 
    }
    return res;
}

void parce(vector<string> &text, int level) {
    vector<string> res;
    for(auto str : text) {
        vector<string> part = _parce(str, level);
        res.reserve(res.size() + part.size());
        for(auto sub_str : part) {
            res.push_back(sub_str);
        }
    }
    swap(res, text);
}

ll levenshtein_distance(vector<string> &text1, vector<string> &text2, int level) {
    parce(text1, level);
    parce(text2, level);
    ll n = text1.size();
    ll m = text2.size();
    
    vector<vector<ll>> dp(2, vector<ll>(m+1));
    dp[0][0] = 0;
    for(int i = 1; i <= m; i++) dp[0][i] = dp[0][i-1] + weight['D'];

    for(int i = 1; i <= n; i++) {
        dp[1][0] = dp[0][0] + weight['I'];
        for(int j = 1; j <= m; j++) {
            ll diff = (text1[i-1] == text2[j-1]) ? weight['M'] : weight['R'];
            dp[1][j] = min(min(dp[1][j-1] + weight['D'], dp[0][j] + weight['I']), dp[0][j-1] + diff);
        }
        swap(dp[0], dp[1]);
    }
    return dp[0][m];
}

vector<string> input(const char *__restrict__ name) {
    string word;
    freopen(name, "r", stdin);
    vector<string> text(1);
    while(getline(cin, word)) {
        text[0].append(word + "\n");
    }
    cin.clear();
    fclose(stdin);
    return text;
}

int main()
{
    freopen("checker/result.txt", "w", stdout);

    freopen("checker/settings", "r", stdin);
    cin >> weight['R'];
    cin >> weight['D'];
    cin >> weight['I'];
    fclose(stdin);
    
    // 40 000 -> курсовая за (4e4)^2 = 16e8 ~ 1.6 - 16 сек

    vector<string> text1 = input("checker/text1.txt");
    vector<string> text2 = input("checker/text2.txt");

    for(int i = 3; i >= 0; i--) {
        cout << levenshtein_distance(text1, text2, i) << "\n";
    }

    return 0;
}
