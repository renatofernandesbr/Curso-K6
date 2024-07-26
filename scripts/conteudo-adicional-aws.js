import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
	vus: 100,
	duration: '1m',
	thresholds: {
		checks: ['rate > 0.05'],
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
		'index.html': htmlReport(data),
	};
}
