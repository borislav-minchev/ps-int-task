import { useState, useEffect } from 'react'
import { Partner } from 'types/common'

/**
 * Fetches a file locally by provided url path, and formats it to an array of objects
 */
export default function useJsonFromFile(file: string) {
	const [jsonArray, setJsonArray] = useState<Partner[]>([])
	const [isFileFetchingDone, setIsFileFetchingDone] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (file) {
			fetch(file, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then((response) => {
					if (response.status === 404) {
						throw new Error('File not found')
					} else {
						return response.text()
					}
				})
				.then((text) => {
					const splitText = text.split(/\r?\n/) // Split the text by "new line" character
					const formattedJsonArray = splitText.map((item) => JSON.parse(item))

					setJsonArray(formattedJsonArray)
				})
				.catch(({ message: errorMessage }) => {
					setError(errorMessage)
				})
				.finally(() => {
					setIsFileFetchingDone(true)
				})
		}
	}, [])

	return {
		jsonArray,
		isFileFetchingDone,
		error,
	}
}
