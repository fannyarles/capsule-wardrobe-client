import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dressingApi from '../../services/DressingApi.service';
import brandsData from './../../data/brands.data';
import { categoriesData, occasionsData } from './../../data/itemsParams.data'

function ViewItem() {

    const navigate = useNavigate();

    const { itemId } = useParams();
    const [itemInfos, setItemInfos] = useState({ itemId: '', category: '', brand: '', imageUrl: '', occasions: [], ownerId: null });
    const [isUploading, setIsUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setItemInfos({ ...itemInfos, [name]: value });
    }

    const selectOccasion = e => {
        const value = e.target.getAttribute('data-outfit-occasion');
        if (e.target.classList.contains("selected")) {
            e.target.classList.remove("selected")
            const filteredOccasions = [...itemInfos.occasions].filter(occ => occ !== value);
            setItemInfos({ ...itemInfos, occasions: filteredOccasions })
        } else {
            e.target.classList.add("selected")
            setItemInfos({ ...itemInfos, occasions: [...itemInfos.occasions, value] })
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
        setIsUploading(true);

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        const response = await dressingApi.uploadPhoto(uploadData)
            .catch(err => setErrorMessage("Error while uploading the file: ", err));

        const fileUrl = response.fileUrl;

        setItemInfos({ ...itemInfos, imageUrl: fileUrl });
        setIsUploading(false);
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
                    {categoriesData.map(cat => <>
                        <optgroup key={cat.name} label={cat.name}>
                            {cat.items.map(item => <option key={item}>{item}</option>)}
                        </optgroup>
                    </>)}
                </select><br /><br />


                <label htmlFor="brand">Brand</label><br />
                <input list="brands" id="brand" name="brand" value={itemInfos.brand} onChange={handleInputChange} autoComplete="off" />
                <datalist id="brands">
                    {brandsData.map(brand => <option value={brand} />)}
                </datalist><br /><br />

                <label htmlFor="occasion">Occasions <span className="required">(Required)</span></label><br />
                {occasionsData.map(el => <p data-outfit-occasion={el.value} key={el.value} onClick={selectOccasion} className={itemInfos.occasions.includes(el.value) ? "occasion selected" : "occasion"} >{el.name}</p>)}<br /><br />

                <img src={itemInfos.imageUrl} alt='item-pic' /><br />
                <label htmlFor="picture">Picture <span className="required">(Required)</span></label><br />
                <input name="picture" type="file" onChange={handleUpload} />
                <input type="text" value={itemInfos.imageUrl} readOnly={true} />
                <br /><br />

                <button className="btn btn-primary" type="button" disabled={isUploading}>
                    {isUploading ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                        : <>Edit Item</>}
                </button>
            </form>

            <button className="btn btn-primary" onClick={() => deleteItem()}>Delete item</button>

        </div>

        </>
    )

}

export default ViewItem;