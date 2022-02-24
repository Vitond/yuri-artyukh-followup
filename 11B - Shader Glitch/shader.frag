precision mediump float;
uniform sampler2D uSampler;
uniform float time;
varying vec2 vTextureCoord;
uniform float kofos;

float random (vec2 st) {
	return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* kofos);
}

void main(void) {
	vec2 uv = vTextureCoord;
	float rnd = random( uv ) * time;
	// float rnd = 0.5 * time;

	float y = 0.0;
	float x = 0.0;
	y -= cos(uv.y) * rnd;
	x += sin(uv.y) * rnd;

	//y += cos((uv.y) * 3.0 * rnd);
	//x += sin((uv.y) * 3.0 * rnd);
	float r = texture2D(uSampler, uv + vec2(y, x*rnd)).r;
	float g = texture2D(uSampler, uv + vec2(y*rnd, x)).g;
	// float b = texture2D(uSampler, uv + vec2(y, -x*rnd)).b;
	float b = texture2D(uSampler, uv ).b;
	float w = 0.0;

	uv.y *= -time*1.2;
	r += uv.y;
	g += uv.y;
	b += uv.y;
	w -= time;


	gl_FragColor = vec4(r,g,b,w);
}



 