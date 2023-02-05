function checkValidHex(v) {
  if (!v) return;
  if (v?.length < 7) return false;
  return /^#[0-9A-F]{6}$/i.test(v);
}

export { checkValidHex };
