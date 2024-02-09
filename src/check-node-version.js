export default () => {
  const version = process.version
  .substring(1)
  .split('.')
  .map(Number)

  const minValidVersion = '18.0.0'
    .split('.')
    .map(Number)

  for (let i = 0; i < minValidVersion.length; i++) {
    if (version[i] > minValidVersion[i]) {
      break;
    } else if (version[i] < minValidVersion[i]) {
      console.error(`Versión de node demasiado baja (${version.join('.')}). Se requiere >= ${minValidVersion.join('.')}`);
      process.exit(1);
    }
  }
}
