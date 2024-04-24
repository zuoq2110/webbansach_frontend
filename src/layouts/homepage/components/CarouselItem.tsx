
import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinHAnhModel from "../../../models/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link } from "react-bootstrap-icons";

interface CarouselItemInterface {
    sach: SachModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {
    const maSach: number = props.sach.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinHAnhModel[]>([])
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true)
    const [baoLoi, setBaoLoi] = useState(null)

    useEffect(() => {
        lay1AnhCuaMotSach(maSach).then(HinhAnhdata => {
            setDanhSachAnh(HinhAnhdata);
            setDangTaiDuLieu(false);
        }).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [])
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }
    let duLieuAnh: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
        duLieuAnh = danhSachAnh[0].duLieuAnh;
    }
    return (
        <div className="row align-items-center">
            <a className="col-5" href={`sach/${props.sach.maSach}`}>
                <div>
                    <img src={duLieuAnh} className="float-end" style={{ width: '150px' }} />
                </div>
            </a>
            <div className="col-7">
                <h5 style={{width:"500px"}}>{props.sach.tenSach}</h5>
                <p style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    lineClamp:2,
                    WebkitBoxOrient:"vertical",
                    width:"600px"}}>{props.sach.moTa}</p>
        </div>
        </div >
    );
}
export default CarouselItem;