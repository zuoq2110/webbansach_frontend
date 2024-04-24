import { useEffect, useState } from "react"
import DonHangModel from "../../models/DonHangModel"
import { layToanBoDonHang, layToanBoDonHangById } from "../../api/DonHangAPI"
import { getIdUserByToken } from "../utils/JwtService"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Chip, IconButton, Tooltip, paginationClasses } from "@mui/material"
import { VisibilityOutlined } from "@mui/icons-material"

interface DonHangTableInterface{
    handleOpen : any;
setMaDonHang:any
countReload: number
setCountReload: any
}
const DonHangTable: React.FC<DonHangTableInterface> = (props) => {
    const [donHang, setDonHang] = useState<DonHangModel[]>([])
    useEffect(() => {
        const maNguoiDung = getIdUserByToken()
        layToanBoDonHangById(maNguoiDung)
            .then((response) => {
                const donHangList= response.map((donHang)=>({
                    ...donHang,
                    id: donHang.maDonHang
                }))
                setDonHang(donHangList)
                
            })
           window.scrollTo(0,0)
    },[setDonHang, props.countReload])

    const columns: GridColDef[] = [
        { field: "maDonHang", headerName: "ID", width: 90 },
        { field: "hoVaTen", headerName: "TÊN KHÁCH HÀNG", width: 180 },
        { field: "ngayTao", headerName: "NGÀY TẠO", width: 110 },
       
        {
            field: "tinhTrangDonHang",
            headerName: "TRẠNG THÁI",
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={
                        params.value === 'Thành công' ? "success"
                            : params.value === "Đang xử lý"
                                ? "info"
                                : params.value === "Đang giao hàng"
                                    ? "warning"
                                    : "error"
                    }
                    variant="outlined"
                />
            )
        },
    { field: "hinhThucThanhToan", headerName: "THANH TOÁN", width: 110 },
    { field: "tongTien", headerName: "TỔNG TIỀN", width: 90 },
        {
            field: "action",
        headerName: "HÀNH ĐỘNG",
        width:150,
        type:"actions",
        renderCell:(item)=>(
            <div>
                <Tooltip title={"Xem chi tiết"}>
                    <IconButton onClick={()=>{props.handleOpen();
                    props.setMaDonHang(item.id)}}>
                        <VisibilityOutlined/>
                    </IconButton>
                </Tooltip>
            </div>
        )
        }
    ]
    return (
<DataGrid rows={donHang} columns={columns} initialState={{
					pagination: { 
						paginationModel: { page: 0, pageSize: 10 },
					},
				}} 
				pageSizeOptions={[10, 15, 20, 30]}></DataGrid>
    )
}

export default DonHangTable