// IndexNow key for www.treatmentshub.com. Not a secret in the credential
// sense - the protocol requires it to be publicly served at /<key>.txt so
// engines can verify we own the host; it only authorizes submitting THIS
// host's URLs. Rotate by minting a new hex string, updating here, and
// renaming the public key file to match.
export const INDEXNOW_KEY = "500308dadc1af5a68815ac610218ade9b0afd4a45b3d2a447970ac69a4eb2cb9";
export const INDEXNOW_HOST = "www.treatmentshub.com";
