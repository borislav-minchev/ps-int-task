import { useState } from 'react'
import './App.css'
import useJsonFromFile from './hooks/use-json-from-file'
import { getDistanceFromCoordinatesInKm } from './utils/utils'
import { Coordinates, EligiblePartner } from './types/common'
import Slider from './components/Slider'
import PartnersList from './components/PartnersList'

const partnersFile = 'partners.txt'

const sofiaOfficeCoordinates = {
	latitude: 42.6665921,
	longitude: 23.351723,
}

const minDistance = '1'
const maxDistance = '300'
const defaultDistance = '100'

function App() {
	const [sliderValue, setSliderValue] = useState<string>(defaultDistance)

	const { jsonArray, isFileFetchingDone, error } = useJsonFromFile(partnersFile)

	if (!isFileFetchingDone) {
		return <div>Loading...</div>
	} else if (isFileFetchingDone && error) {
		return <div>{error}</div>
	}

	const eligiblePartners: EligiblePartner[] = []

	jsonArray.forEach((partner) => {
		const targetCoords: Coordinates = {
			latitude: partner.latitude,
			longitude: partner.longitude,
		}

		const distance = getDistanceFromCoordinatesInKm(
			sofiaOfficeCoordinates,
			targetCoords
		)

		if (distance <= parseInt(sliderValue)) {
			eligiblePartners.push({
				id: partner.partner_id,
				name: partner.name,
			})
		}
	})

	return (
		<div className="App">
			<Slider
				minDistance={minDistance}
				maxDistance={maxDistance}
				sliderValue={sliderValue}
				setSliderValue={setSliderValue}
			/>
			<PartnersList eligiblePartners={eligiblePartners} />
		</div>
	)
}

export default App
