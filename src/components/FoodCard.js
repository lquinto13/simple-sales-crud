/** @format */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import app from '../firebaseconfig'
import { getDatabase, ref, get } from 'firebase/database'

function FoodCard({ food, onOpen, onOpenDelete }) {
	const sizeButtons = ['Small', 'Medium', 'Large']
	const [sizePrice, setSizePrice] = useState([])
	const [newPrice, setNewPrice] = useState(food.foodPrice)
	const [newCost, setNewCost] = useState(food.foodCost)
	const [focusedButton, setFocusedButon] = useState(null)
	useEffect(function () {
		async function fetchSizeData() {
			try {
				const db = getDatabase(app)
				const dbRef = ref(db, 'sizes')
				const snapshot = await get(dbRef)
				const myData = snapshot.val()

				setSizePrice(myData)
			} catch (err) {
				alert(err.message)
			}
		}
		fetchSizeData()
	}, [])

	const handleButtonFocus = (index) => {
		setFocusedButon(index)
	}
	function calculatePriceAndCost(size) {
		const foodBasePrice = Number(food?.foodPrice)
		const foodBaseCost = Number(food?.foodCost)
		switch (size.toLowerCase()) {
			case 'medium':
				setNewPrice(
					Math.trunc(foodBasePrice + foodBasePrice * sizePrice.medium)
				)
				setNewCost(Math.trunc(foodBaseCost + foodBaseCost * sizePrice.medium))
				break
			case 'large':
				setNewPrice(Math.trunc(foodBasePrice + foodBasePrice * sizePrice.large))
				setNewCost(Math.trunc(foodBaseCost + foodBaseCost * sizePrice.large))
				break
			default:
				setNewPrice(foodBasePrice)
				setNewCost(foodBaseCost)
		}
	}
	return (
		<li className='animate-slideIn opacity-0'>
			<div>
				<div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
					<div className='max-w-2xl mx-auto'>
						<div className='h-128 w-128 relative'>
							<img
								src={food?.foodPhoto}
								alt='food'
							/>
							<span className='absolute top-5 left-5 cursor-pointer'>
								<FontAwesomeIcon
									className=' text-red-500'
									icon={faX}
									onClick={() => onOpenDelete(food?.foodId)}
								/>
							</span>
							<span className='absolute top-5 right-5 cursor-pointer'>
								<FontAwesomeIcon
									className='text-slate-50'
									icon={faPenToSquare}
									onClick={() => onOpen(food?.foodId)}
								/>
							</span>
						</div>
					</div>
					<div className='p-4 sm:p-6'>
						<div className='mb-2 w-max px-4 border bg-slate-200 rounded-2xl'>
							<h2 className='text-[#3C3C4399]'>{food?.foodCategory}</h2>
						</div>
						<div className='flex justify-between'>
							<p className='font-bold text-gray-700  leading-7 mb-1 text-2xl'>
								{food?.foodName}
							</p>

							{/* Serving Buttons */}
							{food?.foodHasSize ? (
								<div className='flex gap-2'>
									{sizeButtons.map((x, i) => (
										<button
											onClick={() => calculatePriceAndCost(x)}
											className={`px-4 border border-emerald-500 rounded-full shadow-md hover:bg-emerald-500 transition ease-in duration-75 ${
												focusedButton === i
													? `active:bg-emerald-500 bg-emerald-500`
													: ''
											}`}
											onFocus={() => handleButtonFocus(i)}>
											{x}
										</button>
									))}
								</div>
							) : (
								''
							)}
						</div>
						<h1 className='text-xl text-[#3C3C4399]'>
							Stock: {food?.foodStock}
						</h1>
						<div className='flex flex-row justify-between'>
							<p className='text-[17px] font-bold text-[#0FB478] mr-2'>
								Price: {newPrice}
							</p>

							<p className='text-[#3C3C4399] text-4 mr-2'>Cost: {newCost}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}

export default FoodCard
