



## *Bitcoin Signet Observability*
## 2026

### • Grafana, Loki, Alloy
### • Ansible, Docker, Azure
A full observability stack for a Bitcoin Core 27.0 Signet node running on an Azure VM. Solo build, end to end, from bare Ubuntu to dashboards.

Grafana Alloy tails bitcoind's debug.log by inode so it survives log rotation, runs regex pipelines to attach severity and functional labels, and ships everything into Loki 3.0. On top of that sits a 14-panel Grafana dashboard with 12 precomputed LogQL recording rules.

Five alert rules fire into Telegram: peer disconnect storms, block download failures, chain reorgs, RPC errors and P2P issues. I wanted to know when the node went quiet without watching it.

The whole machine rebuilds from one Ansible playbook across three roles. Defense in depth: Azure NSG plus UFW, RPC bound to localhost, Loki on 127.0.0.1, SSH keys only, and systemd hardening on bitcoind.

https://github.com/pracheersrivastava/bitcoin-monitoring
