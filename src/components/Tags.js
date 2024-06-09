/** @format */

import { useState } from 'react'

function Tags({ changeFilter }) {
	const filterArray = ['Entree', 'Sides', 'Beverage', 'Dessert']

	return (
		<div className='flex gap-2 mt-8'>
			{filterArray.map((x) => (
				<button
					className='text-xl py-2 px-8 border drop-shadow-xl border-slate-400 rounded-full bg-slate-400 text-white hover:bg-slate-200 hover:border-slate-200 hover:text-slate-600 transition ease-in duration-150'
					onClick={() => changeFilter(x)}>
					{x}
				</button>
			))}
		</div>
	)
}

export default Tags
