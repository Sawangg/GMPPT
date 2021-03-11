import React from 'react';
import Particles from 'react-particles-js';

export default function Particules() {

	return (
		<Particles
			style={{ position: "absolute", opacity: "0.6", top: 0 }}
			height="100vh"
			width="100%"
			params={{
				particles: {
					color: {
						value: "#000000"
					},
					line_linked: {
						color: {
							value: "#000000"
						}
					},
					number: {
						value: 50
					},
					size: {
						value: 3
					}
				},
				"interactivity": {
					"events": {
						"onhover": {
							"enable": true,
							"mode": "repulse"
						}
					}
				}
			}}
		/>
	);
}