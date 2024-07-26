//k6 run ./conteudo-adicional-dashboard.js --env K6_WEB_DASHBOARD=true --env K6_WEB_DASHBOARD_EXPORT=dashboard.html
//http://localhost:5665

import http from 'k6/http';
import { check } from 'k6';

export const options = {
	vus: 100,
	duration: '1m',
	thresholds: {
		checks: ['rate < 0.05'],
	},
};

export default function () {
	const URL = 'http://test-api.k6.io/public/crocodiles/';

	const res = http.get(URL);

	check(res, {
		'Status code é 200.': (r) => r.status === 200,
	});
}

export function handleSummary(data) {
	return {
		'saida.html': htmlReport(data),
	};
}
