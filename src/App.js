/** @format */
import { useState, useEffect } from 'react'
import app from './firebaseconfig'
import { getDatabase, ref, get, remove, set } from 'firebase/database'
import FoodCard from './components/FoodCard'
import Header from './components/Header'
import Spinner from './components/Spinner'
import ModalForms from './components/ModalForms'
import Tags from './components/Tags'
import AddProduct from './components/AddProduct'
import DeleteModal from './components/DeleteModal'

function App() {
	const [menuArray, setMenuArray] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenModalAdd, setisOpenModalAdd] = useState(false)
	const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

	const [selectedId, setSelectedId] = useState('')
	const [categoryFilter, setCategoryFilter] = useState(null)
	const fetchData = async function fetchData() {
		try {
			setIsLoading(true)
			const db = getDatabase(app)
			const dbRef = ref(db, 'foods')
			const snapshot = await get(dbRef)
			const myData = snapshot.val()
			const tempArr = Object.keys(myData).map((id) => {
				return {
					...myData[id],
					foodId: id,
				}
			})
			setMenuArray(
				!categoryFilter
					? tempArr
					: tempArr.filter((x) => x.foodCategory === categoryFilter)
			)
		} catch (err) {
			alert(err.message)
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(
		function () {
			fetchData()
		},
		[categoryFilter]
	)

	// ------- Functions ---------
	function handleOpen(id) {
		if (isOpen === false) {
			setIsOpen(!isOpen)
		}
		setSelectedId(id)
		if (id === selectedId) setIsOpen(!isOpen)
	}

	function handleOpenDelete(id) {
		if (isOpenModalDelete === false) {
			setIsOpenModalDelete(!isOpenModalDelete)
		}
		setSelectedId(id)
		if (id === selectedId) setIsOpenModalDelete(!isOpenModalDelete)
	}

	function changeFilter(category) {
		if (categoryFilter === category) {
			setCategoryFilter('')
		} else {
			setCategoryFilter(category)
		}
	}

	const deleteFood = async function (id) {
		try {
			const db = getDatabase(app)
			const dbRef = ref(db, `foods/${id}`)
			const dbRefData = ref(db, `foods`)
			await remove(dbRef)
			const snapshot = await get(dbRefData)
			const myData = snapshot.val()
			const tempArr = Object.keys(myData).map((id) => {
				return {
					...myData[id],
					foodId: id,
				}
			})
			setMenuArray(tempArr)
			fetchData()
			handleOpenDelete(selectedId)
		} catch (err) {
			alert(err.message)
		}
	}

	//------ Template ---------
	return (
		<div className='App'>
			<div className='h-screen px-10 pb-10 mb-10 relative'>
				<Header />
				{isOpen === true ? (
					<ModalForms
						onOpen={handleOpen}
						selectedId={selectedId}
						menuArray={menuArray}
						setMenuArray={setMenuArray}
						setIsLoading={setIsLoading}
					/>
				) : (
					''
				)}

				{isOpenModalDelete === true ? (
					<DeleteModal
						onOpen={handleOpenDelete}
						selectedId={selectedId}
						deleteFood={deleteFood}
						setIsLoading={setIsLoading}
					/>
				) : (
					''
				)}
				{isLoading === true ? (
					<div className='absolute inset-0 flex items-center justify-center'>
						<Spinner />
					</div>
				) : (
					<>
						<Tags
							setCategoryFilter={setCategoryFilter}
							changeFilter={changeFilter}
							categoryFilter={categoryFilter}
						/>
						<ul className='grid grid-cols-3 justify-self-center gap-x-3 gap-y-4 mt-4 z-0 pb-10'>
							{menuArray.map((food, index) => (
								<FoodCard
									food={food}
									key={index}
									onOpen={handleOpen}
									onOpenDelete={handleOpenDelete}
									deleteFood={deleteFood}
								/>
							))}
						</ul>
					</>
				)}
				{!isOpenModalAdd ? (
					<button
						onClick={() => setisOpenModalAdd(true)}
						className='cursor-pointer p-2 fixed w-16 h-16 bottom-10 right-10 flex items-center justify-center border rounded-full border-emerald-500 bg-emerald-500'>
						<h1 className='text-4xl text-white mb-2 leading-none'>+</h1>
					</button>
				) : (
					<AddProduct
						setisOpenModalAdd={setisOpenModalAdd}
						setIsLoading={setIsLoading}
						setMenuArray={setMenuArray}
					/>
				)}
			</div>
		</div>
	)
}

export default App
