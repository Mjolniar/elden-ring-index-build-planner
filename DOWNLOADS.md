# Downloads And Code Signing

Official Windows downloads for Elden Ring Randomizer Index and Build Planner are published on GitHub Releases:

- [Latest GitHub releases](https://github.com/Mjolniar/elden-ring-index-build-planner/releases)
- [Nexus Mods page](https://www.nexusmods.com/eldenring/mods/9837)

The GitHub Releases page is the primary download source. Nexus Mods mirrors may temporarily require manual moderation review when automated scanners quarantine new Windows desktop builds.

## Code Signing

This project uses SignPath Foundation for code signing of signed Windows release builds when SignPath-signed artifacts are available.

Free code signing is provided by SignPath.io, certificate by SignPath Foundation.

Older release files and builds published before SignPath onboarding may be unsigned. Signed releases will be identified in their release notes.

## Release Verification

The source code, release notes, and build commands are published in this repository. Reviewers can rebuild the app with:

```bash
git clone https://github.com/Mjolniar/elden-ring-index-build-planner.git
cd elden-ring-index-build-planner
npm ci
npm test
npm run dist
```

The app is an offline Electron desktop utility. It reads local spoiler log files selected by the user, stores local preferences/checklists, and does not modify Elden Ring game files.
