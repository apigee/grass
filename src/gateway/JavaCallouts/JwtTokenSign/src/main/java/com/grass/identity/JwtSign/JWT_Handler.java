package com.grass.identity.JwtSign;

import java.security.InvalidKeyException;
import java.security.SignatureException;
import java.util.Calendar;
import java.util.regex.Pattern;

import net.oauth.jsontoken.JsonToken;
import net.oauth.jsontoken.crypto.HmacSHA256Signer;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class JWT_Handler {

    private String ISSUER;
    private String SIGNING_KEY;
    private String SUB;
    private String AUD;
    private long AUTH_TIME;
    private String NONCE;

    public JWT_Handler(String sub, String aud, String issuer,long authTime,  String key, String nonce) {
        this.ISSUER = issuer;
        this.SIGNING_KEY = key;
        this.SUB = sub;
        this.AUD = aud;
        this.AUTH_TIME = authTime;
        this.NONCE=nonce;
    }

    public String getJWT() throws InvalidKeyException, SignatureException {
        JsonToken token;
        token = createToken();
        return token.serializeAndSign();
    }

    private JsonToken createToken() throws InvalidKeyException {
        //Current time and signing algorithm
        Calendar cal = Calendar.getInstance();
        HmacSHA256Signer signer = new HmacSHA256Signer(ISSUER, null, SIGNING_KEY.getBytes());

        //Configure JSON token
        JsonToken token = new net.oauth.jsontoken.JsonToken(signer);
        token.setAudience(AUD);
        
        token.setIssuedAt(new org.joda.time.Instant(cal.getTimeInMillis()));
        token.setExpiration(new org.joda.time.Instant(cal.getTimeInMillis() + 60000L));
        token.setParam("auth_time", AUTH_TIME);
        token.setParam("sub", SUB);
        if(NONCE != null && NONCE != ""){
        	token.setParam("nonce", NONCE);
        }

        return token;
    }

    public String deserialize(String tokenString) {
        String[] pieces = splitTokenString(tokenString);
        String jwtPayloadSegment = pieces[1];
        JsonParser parser = new JsonParser();
        JsonElement payload = parser.parse(StringUtils.newStringUtf8(Base64.decodeBase64(jwtPayloadSegment)));
        return payload.toString();
    }

    /**
     * @param tokenString The original encoded representation of a JWT
     * @return Three components of the JWT as an array of strings
     */
    private String[] splitTokenString(String tokenString) {
        String[] pieces = tokenString.split(Pattern.quote("."));
        if (pieces.length != 3) {
            throw new IllegalStateException("Expected JWT to have 3 segments separated by '"
                    + "." + "', but it has " + pieces.length + " segments");
        }
        return pieces;
    }
}
