"use strict";

import tweetnacl from 'tweetnacl';
const { randomBytes, secretbox } = tweetnacl;

function is_uint8array(buffer) {
	return buffer instanceof Uint8Array;
}

/**
 * Creates a new key ready for encryption.
 * @return	{string}	A new base64-encoded key.
 */
function make_key() {
	return Buffer.from(randomBytes(secretbox.keyLength)).toString("base64");
}

/**
 * Encrypts the given data with the given key.
 * @param	{string}	key		The base64-encoded key to use to encrypt the data.
 * @param	{string}	data	The data to encrypt.
 * @return	{string}	The encrypted data, base64 encoded.
 */
function encrypt(key, data) {
	const key_bytes = Buffer.from(key, "base64");
	const data_bytes = Buffer.from(data, "utf-8");
	return encrypt_bytes(key_bytes, data_bytes).toString("base64");
}

/**
 * Encrypts the given data with the given key.
 * @param	{Buffer|Uint8Array}	key		The key to use to encrypt the data.
 * @param	{Buffer|Uint8Array}	data	The data to encrypt.
 * @return	{Buffer}	The encrypted data.
 */
function encrypt_bytes(key_bytes, data_bytes) {
	if(!is_uint8array(key_bytes)) throw new Error(`Error: Expected key_bytes to be of type Uint8Array, but got ${typeof key_bytes}`);
	if(!is_uint8array(data_bytes)) throw new Error(`Error: Expected data_bytes to be of type Uint8Array, but got ${typeof data_bytes}`);
	
	const nonce = randomBytes(secretbox.nonceLength);
	
	const cipher_bytes = secretbox(data_bytes, nonce, key_bytes);
	
	const concat_bytes = Buffer.concat([nonce, cipher_bytes]);
	
	// We don't need to zero out the key after we're done in this instance,
	// since we only have a reference to the actual key
	// key_bytes.fill(0);
	// nonce.fill(0);
	
	return Buffer.from(concat_bytes);
}

/**
 * Decrypts the given data with the given key.
 * @param	{string}	key				The base64-encoded key to use to decrypt the data.
 * @param	{string}	cipher_text		The base64-encoded ciphertext to decrypt.
 * @return	{string}	The decoded data, utf-8 encoded.
 */
function decrypt(key, cipher_text) {
	const concat_bytes = Buffer.from(cipher_text, "base64");
	const key_bytes = Buffer.from(key, "base64");
	
	const data_bytes = decrypt_bytes(key_bytes, concat_bytes);
	if(data_bytes === null) return null;
	return data_bytes.toString("utf-8");
}

/**
 * Decrypts the given data with the given key.
 * @param	{Buffer|Uint8Array}	key				The key to use to decrypt the data.
 * @param	{Buffer|Uint8Array}	cipher_text		The ciphertext to decrypt.
 * @return	{Buffer}	The decoded data.
 */
function decrypt_bytes(key_bytes, cipher_text_bytes) {
	if(!is_uint8array(key_bytes)) throw new Error(`Error: Expected key_bytes to be of type Uint8Array, but got ${typeof key_bytes}`);
	if(!is_uint8array(cipher_text_bytes)) throw new Error(`Error: Expected cipher_text_bytes to be of type Uint8Array, but got ${typeof cipher_text_bytes}`);
	const nonce = new Uint8Array(cipher_text_bytes.slice(0, secretbox.nonceLength));
	const cipher_bytes = new Uint8Array(cipher_text_bytes.slice(secretbox.nonceLength));
	
	const data_bytes = secretbox.open(cipher_bytes, nonce, key_bytes);
	// Failed to decrypt message. Could be because the nonce, key, or ciphertext is invalid
	// Ref https://github.com/dchest/tweetnacl-js/blob/master/test/04-secretbox.quick.js
	// Ref https://github.com/dchest/tweetnacl-js/wiki/Examples#secretbox
	if(!data_bytes) return null;
	return Buffer.from(data_bytes);
}

export { make_key, encrypt, decrypt, encrypt_bytes, decrypt_bytes };
