import { Coordinates } from '../types/common'

// A magical formula for calculating distance between latitude and longitude on a sphere (Earth)
export function getDistanceFromCoordinatesInKm(
	originCoords: Coordinates,
	targetCoords: Coordinates
) {
	const R = 6371 // Radius of the earth in km
	const { latitude: lat1, longitude: lon1 } = originCoords
	const { latitude: lat2, longitude: lon2 } = targetCoords

	const dLat = deg2rad(lat2 - lat1) // deg2rad below
	const dLon = deg2rad(lon2 - lon1)

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) *
			Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = R * c // Distance in km

	return Math.floor(distance)
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180)
}
