import React, { useState } from 'react'
const FilterSlider = ({
    settoggleFilter,
    genderButtons,
    setgenderButtons,
    priceRange,
    setpriceRange,
    category,
    setcategory,
    rating,
    setrating }) => {
    // const [genderButtons, setgenderButtons] = useState("")
    // const [priceRange, setpriceRange] = useState("")
    // const [category, setcategory] = useState("")
    // const [rating, setrating] = useState("")

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setcategory(category.filter(option => option !== value));
        } else {
            setcategory([...category, value]);
        }
    };
    const handleRatingChange = (event) => {
        setrating(event.target.value);
    };
    const handleVolumeChange = (event) => {
        setpriceRange(event.target.value);
    };
    console.log(rating)

    const handleClearButton = () => {
        setgenderButtons("")
        setpriceRange("")
        setcategory("")
        setrating("")
    }
    return (
        <div className='h-screen  w-full md:w-[30%] lg:[35%] overflow-y-scroll pl-8 pr-4 py-4 blur-container z-50 fixed top-0 left-0 ease-in-out'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Filter Products</h1>
                <button
                    onClick={() => settoggleFilter(prev => !prev)}
                    className='font-bold text-2xl'>X</button>
            </div>
            <div className='mt-4'>
                <button className=' rounded-md px-2  py-1 shadow-md'
                    type='button'
                    onClick={handleClearButton}
                >Clear</button>
            </div>
            <div className='mt-8'>
                <h1 className='text-2xl font-semibold'>Gender</h1>
                <div className='flex flex-wrap gap-4 mt-4'>
                    <button
                        type='button'
                        onClick={() => setgenderButtons("Male")}
                        className={`w-24 h-8 rounded-md shadow-md hover:bg-brown-700 hover:text-white ${genderButtons === "men" ? 'bg-brown-700 text-white' : ''}`}
                    >
                        Men
                    </button>
                    <button
                        type='button'
                        onClick={() => setgenderButtons("female")}
                        className={`w-28 h-8 rounded-md shadow-md hover:bg-brown-700 hover:text-white ${genderButtons === "women" ? 'bg-brown-700 text-white' : ''}`}
                    >
                        Women
                    </button>
                    <button
                        type='button'
                        onClick={() => setgenderButtons("Children")}
                        className={`w-28 h-8 rounded-md shadow-md hover:bg-brown-700 hover:text-white ${genderButtons === "children" ? 'bg-brown-700 text-white' : ''}`}
                    >
                        Children
                    </button>
                </div>
            </div>
            <div className='mt-8'>
                <h1 className='text-2xl font-semibold'>Price Range</h1>
                <div className='w-full mt-2'>
                    <input
                        value={priceRange}
                        onChange={handleVolumeChange}
                        className='w-full' type="range" id="priceRange" name="priceRange" min="0" max="2000" step="500" list='markers' defaultValue={"0"} />
                    <datalist id="markers">
                        <option value="0">0</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="1500">1500</option>
                        <option value="2000">2000</option>
                    </datalist>
                    <div className='flex justify-between text-sm ml-1'>
                        <span>0</span>
                        <span>500</span>
                        <span>1000</span>
                        <span>1500</span>
                        <span>2000</span>
                    </div>
                </div>
            </div>
            <div className='mt-8'>
                <h1 className='text-2xl font-semibold'>Categories</h1>
                <div className='font-semibold'>
                    <label htmlFor="sporty" className="block mt-4">
                        <input
                            onChange={handleCheckboxChange}
                            checked={category.includes('shirts')}
                            type="checkbox" value="shirts" name="shirts" id="shirts" />
                        <span className="ml-2">Shirts</span>
                    </label>
                    <label htmlFor="casual" className="block mt-4">
                        <input
                            onChange={handleCheckboxChange}
                            checked={category.includes('pants')}
                            type="checkbox" value="pants" name="pants" id="pants" />
                        <span className="ml-2">Pants</span>
                    </label>
                </div>
            </div>
            <div className='mt-8'>
                <h1 className='text-2xl font-semibold'>Rating</h1>
                <div className="flex flex-col items-start mt-4 justify-between">
                    <div className='flex items-center gap-2 justify-center'>
                        <input
                            type="radio"
                            id="rating1"
                            name="rating"
                            value="1"
                            onChange={handleRatingChange}
                            checked={rating === "1"}
                        />
                        <label htmlFor="rating1" className="mr-2">1 star & above</label>
                    </div>

                    <div className='flex items-center gap-2 justify-center'>
                        <input
                            type="radio"
                            id="rating2"
                            name="rating"
                            value="2"
                            onChange={handleRatingChange}
                            checked={rating === "2"}
                        />
                        <label htmlFor="rating2" className="mr-2">2 star & above</label>
                    </div>

                    <div className='flex items-center gap-2 justify-center'>
                        <input
                            type="radio"
                            id="rating3"
                            name="rating"
                            value="3"
                            onChange={handleRatingChange}
                            checked={rating === "3"}
                        />
                        <label htmlFor="rating3" className="mr-2">3 star & above</label>
                    </div>

                    <div className='flex items-center gap-2 justify-center'>
                        <input
                            type="radio"
                            id="rating4"
                            name="rating"
                            value="4"
                            onChange={handleRatingChange}
                            checked={rating === "4"}
                        />
                        <label htmlFor="rating4" className="mr-2">4 star & above</label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FilterSlider