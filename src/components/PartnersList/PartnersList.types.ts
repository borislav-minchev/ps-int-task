import { EligiblePartner } from 'types/common'

export type Props = {
	eligiblePartners: EligiblePartner[]
}

export type SortDirection = 'ascending' | 'descending'

export type SortProperty = 'id' | 'name'
