import type { APIRoute } from 'astro';
import keyAscContent from '../../public/key.asc?raw';

export const GET: APIRoute = async () => {
    return new Response(
        `This is a text version of my PGP public key, used to verify my identity and encrypt messages to me.

You can also download this key in ASCII-armored format at https://bsoyka.me/key.asc.

Find proof this key is mine at https://bsoyka.me/proof or https://keybase.io/bsoyka.

${keyAscContent}`,
        {
            headers: {
                'Content-Type': 'text/plain',
            },
        }
    );
};