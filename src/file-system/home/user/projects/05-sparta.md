



## *SPARTA*
## 2025

### • Python, Flask, scikit-learn
### • Manifest V3, Cybersecurity
A browser extension that warns you about phishing URLs while you browse. Co-built with Saurav Chourasia.

The pipeline is small but complete: extract lexical features from a URL, train a Random Forest on a phishing dataset, persist it with joblib, and serve predictions from a Flask REST API. A Manifest V3 extension for Chrome and Edge scans each page on navigation and also takes a URL you paste in by hand.

The reason the model sits behind an API rather than in the browser is simple. scikit-learn does not run in a content script, so the extension stays thin and the classifier stays server side.

Honest limit: it reads a handful of URL features, so it catches sloppy phishing links and misses anything sophisticated. It was my first end-to-end ML system and it taught me where the seams are.

https://github.com/pracheersrivastava/SPARTA_Extension
