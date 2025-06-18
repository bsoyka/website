import fs from 'node:fs';
import path from 'node:path';
import type {APIRoute} from 'astro';

export const GET: APIRoute = async () => {
    const keyAscContent = fs.readFileSync(path.join(process.cwd(), 'public', 'key.asc'), 'utf-8');

    return new Response(`This is a text version of my PGP public key, used to verify my identity and encrypt messages to me.

You can also download this key in ASCII-armored format at https://bsoyka.me/key.asc.

Find proof this key is mine at https://bsoyka.me/proof or https://keybase.io/bsoyka.

${keyAscContent}`, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
};