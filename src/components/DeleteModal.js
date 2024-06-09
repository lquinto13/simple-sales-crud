/** @format */

function DeleteModal({ onOpen, deleteFood, onOpens, selectedId }) {
	console.log(selectedId)
	return (
		<>
			{/* Overlay */}
			<div className='fixed top-0 left-0 w-screen h-screen opacity-70 z-50 bg-black'></div>
			{/* onClick={() => onOpen(selectedId)}></div> */}

			{/* Modal */}
			<div className='abs-center bg-white  rounded-md shadow-lg fixed h-[200px] w-[500px] z-50'>
				<header className='flex justify-between mb-4 bg-emerald-500 w-full px-2 border border-emerald-500 rounded-t-md shadow-lg'>
					<h1 className='p-2 text-center font-medium text-4xl text-slate-200'>
						Confirm Deletion
					</h1>
					<p
						className='mt-1 p-2 text-2xl cursor-pointer text-slate-200 font-medium '
						onClick={() => onOpen(false)}>
						X
					</p>
				</header>
				<h2 className='p-4 text-xl'>Delete this item?</h2>
				<div className='flex px-4 justify-evenly'>
					<button
						className='text-xl text-bold px-10 py-3 border rounded-md bg-rose-500 border-red-500 shadow-md  hover:bg-rose-800  transition ease-in duration-100'
						onClick={() => deleteFood(selectedId)}>
						Yes
					</button>
					<button
						className='text-xl text-bold border-emerald-500 shadow-md  border rounded-md px-10 py-3 hover:bg-emerald-500 transition ease-in duration-100'
						onClick={() => onOpen(selectedId)}>
						No
					</button>
				</div>
			</div>
		</>
	)
}

export default DeleteModal
