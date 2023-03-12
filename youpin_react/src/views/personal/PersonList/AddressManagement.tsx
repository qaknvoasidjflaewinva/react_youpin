import { useEffect, useState } from 'react'
import AddAddress from "./AddAddress";

function AddressManagement() {

    const [no, setNo] = useState<string>('none')

    function address() {
        setNo('block')
    }
    return (
        <div>
            <div className="Adtitle">地址管理</div>
            <div>
                <div className="acontent" onClick={address}>
                    <div className="addAd">
                        <svg style={{ width: "80px", color: 'red' }} fill="#e7e7e7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M38,17.1H22V2a2,2,0,0,0-4,0V17.1H2a2,2,0,0,0-2,2H0a2,2,0,0,0,2,2H18V38a2,2,0,0,0,4,0V21.1H38a2,2,0,0,0,2-2h0A2,2,0,0,0,38,17.1Z"></path></svg>
                        <div>添加新地址</div>
                    </div>
                </div>
            </div>
            <div style={{display:no}}>
                <AddAddress setNo={setNo} />
            </div>
        </div>
    )
}
export default AddressManagement;