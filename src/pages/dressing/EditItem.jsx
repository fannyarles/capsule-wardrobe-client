import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dressingApi from '../../services/DressingApi.service';
import brandsData from './../../data/brands.data';
import { categoriesData, occasionsData } from './../../data/itemsParams.data'
import { toast } from "react-hot-toast";

function EditItem() {

    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');

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

        axios.put(`${process.env.REACT_APP_API_URL}/dressing/item/${itemId}`, { ...itemInfos, occasions: itemInfos.occasions }, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => {
                toast.success(`Item successfully deleted!`);
                navigate('/dressing')
            })
            .catch(err => setErrorMessage(err.response.data.message))

    }

    const deleteItem = e => {
        e.preventDefault();

        axios.delete(`${process.env.REACT_APP_API_URL}/dressing/item/${itemId}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => setItemInfos(response.data[0]))
            .then(() => {
                toast.success(`Item successfully deleted!`);
                navigate('/dressing')
            })
            .catch(err => setErrorMessage(err.response.data.message));
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

    const deletionNotice = e => {
        e.preventDefault();
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/dressing/item/${itemId}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => {
                const item = response.data[0];
                setItemInfos({ itemId: item._id, category: item.category, brand: item.brand, imageUrl: item.imageUrl, occasions: [...item.occasions], ownerId: item.ownerId })
            })
            .catch(err => console.log(err));
    }, [itemId])

    return (<>
        <div className="row mb-4">
            <div className="col col-12">
                <h1>Edit Item</h1>
            </div>
        </div>
        <div className="row">

            <form onSubmit={handleSubmit}>

                <div className="col col-12">

                    <div className="row flex-row justify-content-center">

                        <div className="col col-lg-4 col-md-6 col-sm-12">
                            <img src={itemInfos.imageUrl} alt='item-pic' width="100%" /><br />
                        </div>

                        <div className="col col-lg-4 col-md-6 col-sm-12 text-start d-flex flex-column justify-content-between">

                            <div>

                                <label htmlFor="category">Category<span className="required">(Required)</span></label><br />
                                <select name="category" value={itemInfos.category} onChange={handleInputChange}>
                                    {categoriesData.map(cat => <>
                                        <optgroup key={cat.name} label={cat.name}>
                                            {cat.items.map(item => <option key={item}>{item}</option>)}
                                        </optgroup>
                                    </>)}
                                </select><br /><br />

                                <label htmlFor="occasion">Occasions <span className="required">(Required)</span></label><br />
                                {occasionsData.map(el => <p data-outfit-occasion={el.value} key={el.value} onClick={selectOccasion} className={itemInfos.occasions.includes(el.value) ? "occasion btn btn-info mx-1" : "occasion btn btn-outline-info mx-1"} >{el.name}</p>)}<br /><br />

                                <label htmlFor="brand">Brand</label><br />
                                <input list="brands" id="brand" name="brand" value={itemInfos.brand} onChange={handleInputChange} autoComplete="off" />
                                <datalist id="brands">
                                    {brandsData.map(brand => <option key={brand} value={brand} placeholder="Brand" />)}
                                </datalist><br /><br />

                                <label htmlFor="picture">Update Picture <span className="required">(Required)</span></label><br />
                                <input name="picture" type="file" onChange={handleUpload} />
                                <input type="hidden" value={itemInfos.imageUrl} readOnly={true} />
                            </div>


                            <div className="col col-12 mt-5">

                                {errorMessage && <><p className="alert alert-danger d-inline-flex" role="alert">{errorMessage}</p><br /></>}

                                <button className="btn btn-primary btn-lg mx-1" type="button" disabled={isUploading} onClick={handleSubmit}>
                                    {isUploading ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                                        : <>Edit Item</>}
                                </button>

                                <button className="btn btn-primary mx-1 btn-lg btn-danger" data-bs-toggle="modal" data-bs-target="#deletionModal" onClick={e => deletionNotice(e)}>Delete item</button>

                                <div class="modal fade" id="deletionModal" tabindex="-1" aria-labelledby="deletionModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="deletionModalLabel">Delete item</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                ...
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" onClick={e => deleteItem(e)} >Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    </>
    )

}

export default EditItem;