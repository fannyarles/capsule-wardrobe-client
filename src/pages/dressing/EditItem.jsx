import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dressingApi from '../../services/DressingApi.service';

function ViewItem() {

    const navigate = useNavigate();

    const { itemId } = useParams();
    // const [occasions, setOccasions] = useState([])
    const [itemInfos, setItemInfos] = useState({ itemId: '', category: '', brand: '', imageUrl: '', occasions: [], ownerId: null })
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setItemInfos({ ...itemInfos, [name]: value });
    }

    const handleCheckboxChange = e => {
        const name = e.target.name;
        const checked = e.target.checked

        if (checked) {
            setItemInfos({ ...itemInfos, occasions: [...itemInfos.occasions, name] })
        } else {
            const updatedOccasions = [...itemInfos.occasions].filter(el => el !== name);
            console.log(updatedOccasions);
            setItemInfos({ ...itemInfos, occasions: [...updatedOccasions] })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (itemInfos.category === '' || itemInfos.imageUrl === '' || !itemInfos.occasions.length) { setErrorMessage(`Please, fill all required fields.`); return; }

        axios.put(`http://localhost:5005/dressing/item/${itemId}`, { ...itemInfos, occasions: itemInfos.occasions })
            .then(response => navigate('/dressing'))
            .catch(err => setErrorMessage(err.response.data.message))
    }

    const isChecked = (occasion) => { if (itemInfos.occasions.includes(occasion)) { return true } }

    const deleteItem = () => {
        axios.delete(`http://localhost:5005/dressing/item/${itemId}`)
            .then(response => setItemInfos(response.data[0]))
            .then(() => navigate('/dressing'))
            .catch(err => console.log(err));
    }

    const handleUpload = async (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        const response = await dressingApi.uploadPhoto(uploadData)
            .catch(err => setErrorMessage("Error while uploading the file: ", err));

        const fileUrl = response.fileUrl;
        setItemInfos({ ...itemInfos, imageUrl: fileUrl });
    }

    useEffect(() => {
        axios.get(`http://localhost:5005/dressing/item/${itemId}`)
            .then(response => {
                const item = response.data[0];
                setItemInfos({ itemId: item._id, category: item.category, brand: item.brand, imageUrl: item.imageUrl, occasions: [...item.occasions], ownerId: item.ownerId })
            })
            .catch(err => console.log(err));
    }, [itemId])

    return (
        <><div id="add-item form-page">
            <h1>Add new clothing item</h1>

            {errorMessage && <p>{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category of clothing <span className="required">(Required)</span></label><br />
                <select name="category" value={itemInfos.category} onChange={handleInputChange}>
                    <optgroup label="Tops">
                        <option>T-shirt</option>
                        <option>Tank top</option>
                        <option>Shirt</option>
                        <option>Blouse</option>
                        <option>Sweater</option>
                        <option>Jacket | Vest</option>
                        <option>Coat</option>
                        <option>Sweater</option>
                    </optgroup>
                    <optgroup label="Bottoms">
                        <option>Jeans</option>
                        <option>Pants</option>
                        <option>Skirt</option>
                        <option>Shorts</option>
                        <option>Tracksuit</option>
                    </optgroup>
                    <optgroup label="Other">
                        <option>Pantsuit</option>
                        <option>Dress</option>
                    </optgroup>
                    <optgroup label="Footwear">
                        <option>Sandals</option>
                        <option>Heels</option>
                        <option>Sneakers</option>
                        <option>Boots</option>
                    </optgroup>
                    <optgroup label="Accessories">
                        <option>Scarf</option>
                        <option>Glasses | Sunglasses</option>
                        <option>Bag | Purse</option>
                        <option>Earrings</option>
                        <option>Bracelet</option>
                        <option>Necklace</option>
                        <option>Ring</option>
                        <option>Watch</option>
                        <option>Belt</option>
                        <option>Hat</option>
                    </optgroup>
                </select><br /><br />

                <label htmlFor="brand">Brand</label><br />
                <input list="brands" id="brand" name="brand" value={itemInfos.brand} onChange={handleInputChange} autoComplete="off" />

                <datalist id="brands">
                    <option value="A.P.C." />
                    <option value="A|X Armani Exchange" />
                    <option value="ACME" />
                    <option value="Acne Studio" />
                    <option value="adidas" />
                </datalist><br /><br />

                <label htmlFor="occasion">Occasions <span className="required">(Required)</span></label><br />
                <input type="checkbox" id="casual" name="casual" onChange={handleCheckboxChange} checked={isChecked('casual')} />
                <label htmlFor="casual">Casual</label><br />
                <input type="checkbox" id="formal" name="formal" value={itemInfos.formal} onChange={handleCheckboxChange} checked={isChecked('formal')} />
                <label htmlFor="formal">Formal</label><br />
                <input type="checkbox" id="business" name="business" value={itemInfos.business} onChange={handleCheckboxChange} checked={isChecked('business')} />
                <label htmlFor="business">Business</label><br />
                <input type="checkbox" id="sportswear" name="sportswear" value={itemInfos.sportswear} onChange={handleCheckboxChange} checked={isChecked('sportswear')} />
                <label htmlFor="sportswear">Sportswear</label><br /><br />

                <img src={itemInfos.imageUrl} alt='item-pic' /><br />
                <label htmlFor="picture">Picture <span className="required">(Required)</span></label><br />
                <input name="picture" type="file" onChange={handleUpload} />
                <input type="text" value={itemInfos.imageUrl} readOnly={true} />
                <br /><br />

                <input type="submit" value="Update item" className='btn btn-primary' />
            </form>

            <button className="btn btn-primary" onClick={() => deleteItem()}>Delete item</button>

        </div>

        </>
    )

}

export default ViewItem;