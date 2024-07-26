import http from 'k6/http';
import { check } from 'k6';

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
