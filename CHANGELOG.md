# bedrock-vue-credential-card ChangeLog

## 6.0.1 - 2022-08-xx

### Fixed
- Ensure components are exported.

## 6.0.0 - 2022-08-22

### Changed
- **BREAKING**: Require `@bedrock/quasar@9`.
- **BREAKING**: Use `exports` in `package.json`.

## 5.0.0 - 2022-05-26

### Changed
- **BREAKING**: Require Vue 3.
- **BREAKING**: Require Quasar 2.

## 4.0.1 - 2022-04-10

### Fixed
- Fix `@bedrock/quasar` peer dep.

## 4.0.0 - 2022-04-10

### Changed
- **BREAKING**: Rename package to `@bedrock/vue-credential-card`.
- **BREAKING**: Convert to module (ESM).

## 3.2.1 - 2021-09-13

### Changed
- Fix issue with presentation view.

## 3.2.0 - 2021-09-13

### Added
- Add delete api for credential cards.

## 3.1.0 - 2021-09-10

### Added
- Add recursive value mapper.

## 3.0.0 - 2021-05-06

### Changed
- **BREAKING**: Lots of refactoring, dependency updates.
- Always use the source as the data to be processed and traversed recursively.
- Support vanilla VCs.
- Add presentation view to details modal.
- Add ability to handle age credentials.

## 2.2.1 - 2020-01-11

### Fixed
- Pass `component` to credential card field components for all views.

## 2.2.0 - 2020-01-10

### Added
- Add view more action for long descriptions.

### Fixed
- Remove unused Less CSS support.

## 2.1.0 - 2020-01-10

### Added
- Display images.

### Fixed
- Display items based on schema order.

## 2.0.0 - 2019-04-12

### Added
- Require use of an Issuer Map that maps IDs to an object.

### Changed
- **BREAKING**: Remove use of `issuerName` and `issuerLogo` within credential.
- **BREAKING**: Re-prioritize credential image fallback logic.
- Localize credential image size logic.
- Only display issuer's name if it exists in the `CredentialsDetails` component.

## 1.0.0 - 2019-04-10

### Added
- Add core files.

- See git history for changes previous to this release.
