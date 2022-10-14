import { useState } from 'react'
import { EligiblePartner } from 'types/common'
import { Props, SortDirection, SortProperty } from './PartnersList.types'
import './PartnersList.scss'

export default function PartnersList({ eligiblePartners }: Props) {
	const [idOrder, setIdOrder] = useState<SortDirection>('ascending')
	const [nameOrder, setNameOrder] = useState<SortDirection>('ascending')
	const [lastSelectedSortProperty, setLastSelectedSortProperty] =
		useState<SortProperty>('id')

	const eligiblePartnersSorted = eligiblePartners.sort(
		(a: EligiblePartner, b: EligiblePartner) => {
			if (lastSelectedSortProperty === 'id') {
				// Sort numerically
				if (idOrder === 'ascending') {
					return a.id - b.id
				} else {
					return b.id - a.id
				}
			} else {
				// Sort alphabetically
				if (nameOrder === 'ascending') {
					return a.name.localeCompare(b.name)
				} else {
					return b.name.localeCompare(a.name)
				}
			}
		}
	)

	const elements = eligiblePartnersSorted.map((item) => (
		<div key={item.id} className="list-item-partner">
			<span>{item.id}</span>
			<span>{item.name}</span>
		</div>
	))

	const toggleIdOrder = () => {
		setIdOrder((prevValue: SortDirection) => {
			return prevValue === 'ascending' ? 'descending' : 'ascending'
		})

		setLastSelectedSortProperty('id')
	}

	const toggleNameOrder = () => {
		setNameOrder((prevValue: SortDirection) => {
			return prevValue === 'ascending' ? 'descending' : 'ascending'
		})

		setLastSelectedSortProperty('name')
	}

	return (
		<div className="container-partners-list">
			<div className="list-header">
				<button className="btn-sort" onClick={toggleIdOrder}>
					Sort By Id
				</button>
				<span>Results: {eligiblePartners.length}</span>
				<button className="btn-sort" onClick={toggleNameOrder}>
					Sort By Name
				</button>
			</div>
			<div className="container-eligible-partners">{elements}</div>
		</div>
	)
}
