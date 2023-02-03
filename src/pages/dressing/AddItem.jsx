import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";
import dressingApi from "./../../services/DressingApi.service";
import brandsData from './../../data/brands.data';
import { categoriesData, occasionsData } from './../../data/itemsParams.data'
import { toast } from "react-hot-toast";
import itemDefault from '../../assets/item-default.jpg';
import Loader from "../../components/Loader";

function AddItem() {

    const navigate = useNavigate();

    const { isUserLoading, user } = useContext(AuthContext);

    const [itemInfos, setItemInfos] = useState({ category: 'T-shirt', brand: '', occasions: [], imageUrl: '', ownerId: null });
    const [isUploading, setIsUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setItemInfos({ ...itemInfos, [name]: value });
    }

    const selectOccasion = e => {
        const value = e.target.getAttribute('data-outfit-occasion');
        if (e.target.classList.contains("btn-info")) {
            e.target.classList.remove("btn-info")
            e.target.classList.add("btn-outline-info")
            const filteredOccasions = [...itemInfos.occasions].filter(occ => occ !== value);
            setItemInfos({ ...itemInfos, occasions: filteredOccasions })
        } else {
            e.target.classList.remove("btn-outline-info")
            e.target.classList.add("btn-info")
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

    return (<>
        <div className="row mb-4">
            <div className="col col-12">
                <h1>Add New Item</h1>
            </div>
        </div>

        <div className="row">

            <form onSubmit={handleSubmit}>

                <div className="col col-12">

                    <div className="row flex-row justify-content-center">

                        <div className="col col-12 col-xl-4 col-lg-6 col-md-12">
                            {isUploading && <Loader />}
                            {!isUploading && <img src={itemInfos.imageUrl === '' ? itemDefault : itemInfos.imageUrl} alt='item-pic' width="100%" className="mb-5" />}
                        </div>

                        <div className="col col-12 col-xl-4 col-lg-6 col-md-12 text-start d-flex flex-column justify-content-between">

                            <div>
                                <label htmlFor="category" className="mt-0">Category<span className="required">(Required)</span></label><br />
                                <select name="category" value={itemInfos.category} onChange={handleInputChange}>
                                    {categoriesData.map(cat => <>
                                        <optgroup key={cat.name} label={cat.name}>
                                            {cat.items.map(item => <option key={item}>{item}</option>)}
                                        </optgroup>
                                    </>)}
                                </select><br /><br />

                                <label htmlFor="occasion">Occasions <span className="required">(Required)</span></label><br />
                                {occasionsData.map(el => <p data-outfit-occasion={el.value} key={el.value} onClick={selectOccasion} className={itemInfos.occasions.includes(el.value) ? "occasion btn btn-info mx-1" : "occasion btn btn-outline-info mx-1"} >{el.name}</p>)}<br />

                                <label htmlFor="brand">Brand</label><br />
                                <input list="brands" id="brand" name="brand" value={itemInfos.brand} onChange={handleInputChange} autoComplete="off" />
                                <datalist id="brands">
                                    {brandsData.map(brand => <option key={brand} value={brand} />)}
                                </datalist><br /><br />

                                <label htmlFor="picture">Picture <span className="required">(Required)</span></label><br />
                                <input name="picture" type="file" onChange={handleUpload} placeholder="Brand" />
                            </div>

                            <div className="col col-12 mt-5">
                                {errorMessage && <><p class="error-message" role="alert">{errorMessage}</p><br /></>}
                                <button className="btn btn-primary btn-lg mx-1" type="button" disabled={isUploading} onClick={handleSubmit}>
                                    {isUploading ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                                        : <>Add Item</>}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>
    </>);
}

export default AddItem;