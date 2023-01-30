import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";
import dressingApi from "./../../services/DressingApi.service";
import brandsData from './../../data/brands.data';
import { categoriesData, occasionsData } from './../../data/itemsParams.data'
import { toast } from "react-hot-toast";

function AddItem() {

    const navigate = useNavigate();

    const { isUserLoading, user } = useContext(AuthContext);

    const [itemInfos, setItemInfos] = useState({ category: '', brand: '', occasions: [], imageUrl: '', ownerId: null });
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

        const addedItem = dressingApi.addItem(itemInfos)
            .then(response => navigate('/dressing'))
            .catch(err => setErrorMessage(err.response.data.message))

        toast.promise(
            addedItem,
            {
                loading: 'Loading',
                success: () => `Item successfully added!`,
                error: () => `Error: ${errorMessage}`,
            },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    duration: 3000,
                    icon: '✔',
                },
            }
        );
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
        if (!isUserLoading) {
            setItemInfos({ ...itemInfos, ownerId: user.id });
        }
    }, [isUserLoading, user])

    return <div id="add-item form-page">
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
                {brandsData.map(brand => <option key={brand} value={brand} />)}
            </datalist><br /><br />

            <label htmlFor="occasion">Occasions <span className="required">(Required)</span></label><br />
            {occasionsData.map(el => <p data-outfit-occasion={el.value} key={el.value} onClick={selectOccasion} className="occasion">{el.name}</p>)}<br /><br />

            <label htmlFor="picture">Picture <span className="required">(Required)</span></label><br />
            <input name="picture" type="file" onChange={handleUpload} />
            <br /><br />

            <button className="btn btn-primary" type="button" disabled={isUploading} onClick={handleSubmit}>
                {isUploading ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                    : <>Add Item</>}
            </button>
        </form>

    </div>
}

export default AddItem;