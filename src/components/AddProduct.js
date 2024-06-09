/** @format */
import app from '../firebaseconfig'
import { getDatabase, ref, set, get, push } from 'firebase/database'
import { useState } from 'react'
import Toggle from 'react-toggle'

function AddProduct({ setisOpenModalAdd, setIsLoading, setMenuArray }) {
	// State variables for form inputs
	const [nameInput, setNameInput] = useState('')
	const [categoryInput, setCategoryInput] = useState('Entree')
	const [priceInput, setPriceInput] = useState(0)
	const [imgInput, setImgInput] = useState('')
	const [costInput, setCostInput] = useState(0)
	const [stockInput, setStockInput] = useState(0)
	const [hasServingsInput, setHasServingsInput] = useState(false)
	// Function to fetch data from Firebase
	const fetchData = async () => {
		try {
			setIsLoading(true)
			const db = getDatabase(app)
			const dbRef = ref(db, 'foods')
			const snapshot = await get(dbRef)
			const data = snapshot.val()
			// Convert data to array format
			const updatedMenuArray = Object.keys(data).map((id) => ({
				...data[id],
				foodId: id,
			}))

			setMenuArray(updatedMenuArray)
		} catch (err) {
			alert(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	// Function to save data to Firebase
	const addData = async () => {
		const db = getDatabase(app)
		const foodRef = push(ref(db, `foods`))
		if (
			!nameInput ||
			!categoryInput ||
			!priceInput ||
			!imgInput ||
			!costInput ||
			!stockInput
		) {
			alert('All inputs must have been filled')
		} else {
			set(foodRef, {
				foodName: nameInput,
				foodCategory: categoryInput,
				foodPrice: priceInput,
				foodPhoto: imgInput,
				foodCost: costInput,
				foodStock: stockInput,
				foodHasSize: hasServingsInput,
			})
				.then(() => {
					fetchData()
					setisOpenModalAdd(false)
				})
				.catch((error) => {
					alert('Error:', error.message)
				})
		}
	}

	return (
		<>
			{/* Overlay */}
			<div
				className='fixed top-0 left-0 w-screen h-screen opacity-70 z-50 bg-black'
				onClick={() => setisOpenModalAdd(false)}></div>

			{/* Modal */}
			<div className='abs-center bg-white  rounded-md shadow-lg fixed h-[500px] w-[500px] z-50'>
				<header className='flex justify-between mb-4 bg-emerald-500 w-full px-2 border border-emerald-500 rounded-t-md shadow-lg'>
					<h1 className='p-2 text-center font-medium text-4xl text-slate-200'>
						Add Food Item
					</h1>
					<p
						className='mt-1 p-2 text-2xl cursor-pointer text-slate-200 font-medium '
						onClick={() => setisOpenModalAdd(false)}>
						X
					</p>
				</header>

				<div className='grid gap-6 mb-6 md:grid-cols-2 justify-items-center'>
					{/* Food Name Input */}
					<div>
						<label
							htmlFor='food_name'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Food Name
						</label>
						<input
							type='text'
							id='food_name'
							className='border px-2 py-1 border-black'
							value={nameInput}
							onChange={(e) => setNameInput(e.target.value)}
							required
						/>
					</div>

					{/* Food Category Input */}
					<div className='w-48'>
						<label
							htmlFor='food_category'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Food Category
						</label>
						<select
							id='food_category'
							className='border w-48 px-2 py-1 border-black'
							value={categoryInput}
							onChange={(e) => setCategoryInput(e.target.value)}>
							<option value='Entree'>Entree</option>
							<option value='Sides'>Sides</option>
							<option value='Dessert'>Dessert</option>
							<option value='Beverage'>Beverage</option>
						</select>
					</div>

					{/* Food Price Input */}
					<div>
						<label
							htmlFor='food_price'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Food Price
						</label>
						<input
							type='text'
							id='food_price'
							className='border px-2 py-1 border-black'
							placeholder={priceInput}
							value={priceInput}
							onChange={(e) => setPriceInput(e.target.value)}
							required
						/>
					</div>

					{/* Food Image Input */}
					<div>
						<label
							htmlFor='food_image'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Food Image
						</label>
						<input
							type='text'
							id='food_image'
							className='border px-2 py-1 border-black'
							placeholder={imgInput}
							value={imgInput}
							onChange={(e) => setImgInput(e.target.value)}
							required
						/>
					</div>

					{/* Food Cost Input */}
					<div className='w-48'>
						<label
							htmlFor='food_cost'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Food Cost
						</label>
						<input
							type='text'
							id='food_cost'
							className='border px-2 py-1 border-black'
							placeholder={costInput}
							value={costInput}
							onChange={(e) => setCostInput(e.target.value)}
							required
						/>
					</div>

					{/* Food Stock Input */}
					<div className='w-48'>
						<label
							htmlFor='food_stock'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Food Stock
						</label>
						<input
							type='text'
							id='food_stock'
							className='border px-2 py-1 border-black'
							placeholder={stockInput}
							value={stockInput}
							onChange={(e) => setStockInput(e.target.value)}
							required
						/>
					</div>

					{/* Has Servings Toggle */}
					<div className='w-48'>
						<label
							htmlFor='food_servings'
							className='block text-left mb-2 text-sm font-medium text-gray-900'>
							Has Servings
						</label>
						<Toggle
							id='food_servings'
							defaultChecked={hasServingsInput}
							value={hasServingsInput}
							onChange={(e) => setHasServingsInput(e.target.checked)}
						/>
					</div>

					{/* Save Button */}
				</div>
				<div className='w-full flex justify-center'>
					<button
						onClick={addData}
						className='group border rounded-2xl px-10 border-emerald-500 bg-emerald-500 p-2  hover:bg-emerald-300 hover:border-emerald-300 shadow-xl transition ease-in duration-100'>
						<p className='font-semibold shadow-sm text-slate-200 group-hover:text-black transition ease-in duration-100'>
							Save
						</p>
					</button>
				</div>
			</div>
		</>
	)
}

export default AddProduct
