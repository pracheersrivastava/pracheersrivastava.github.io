



## *Veil Android*
## 2026

### • Flutter, Riverpod, ExoPlayer
### • Hive, TMDB, CI/CD
Production Flutter client for TMDB media discovery with in-app HLS/DASH playback on native ExoPlayer. I am lead mobile engineer on it, 109 commits so far, building alongside dikshadamahe.

The player was the hard part. I rebuilt it on native ExoPlayer in v3.0.0 with a direct-to-player flow, a stall watchdog and a hardware acceleration toggle, then migrated the source resolver to OMSS v1.0 so a single request returns a playable proxy URL.

It ships as an adaptive shell: bottom nav on phones, a side rail on tablets and TV, driven by windowClass breakpoints. Hive keeps continue-watching, bookmarks and resume positions on device.

I own the release pipeline too. Pushing a v* tag builds a signed APK through GitHub Actions with secrets injected via dart-define. 50+ tagged releases, currently v3.0.2.

https://github.com/dikshadamahe/veil-android
