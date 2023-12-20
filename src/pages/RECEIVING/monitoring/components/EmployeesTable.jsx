// import {DataGrid} from "@material-ui/data-grid";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_PATH} from "@/constants/index.js";
import {Loader} from "@/components/Loader.jsx";

const EmployeesTable = () => {
    const [staff, setStaff] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getStaff = async () => {
            setIsLoading(true)
            const {data} = await axios.get(API_PATH + "/user/staff/")
            setStaff(data)
            setIsLoading(false)
        }
        getStaff()
    }, [])

    const columns = [
        {field: "id", headerName: "Ф.И.О", width: 400},
        {
            field: "all",
            headerName: "Всего",
            width: 400,
            editable: true,
        },
        {
            field: "done",
            headerName: "Cделано",
            width: 200,
            editable: true,
        },
        {
            field: "waiting",
            headerName: "B ожидании ",
            width: 200,
            editable: true,
        },
    ];
    const rows = [
        {
            id: "Махкамов Хумойун Давронович",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович2",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович3",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович4",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович5",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович6",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович7",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович8",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович9",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович0",
            all: "100",
            done: "80",
            waiting: "20",
        },
        {
            id: " Махкамов Хумойун Давронович1",
            all: "100",
            done: "80",
            waiting: "20",
        },
    ];

    return (
        <div className="EmployeesTable TableStyle">
            <div className="cards CardStyle">
                <div className="cardsTop">
                    <h2>Сотрудники</h2>
                    <h3>Показатели сотрудников</h3>
                </div>
                <div className="line"></div>
                <div style={{height: 380, width: "100%"}}>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>Full name</td>
                            <td>Cделано</td>
                            <td>Username</td>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading ? <tr><Loader/></tr> :
                            <>
                                {staff && staff.map((item) => (
                                    <tr key={item.id}>
                                        <th>{item.id}</th>
                                        <th>{item.full_name}</th>
                                        <th>{item.role}</th>
                                        <th>{item.username}</th>
                                    </tr>
                                ))}
                            </>}
                        </tbody>
                    </table>
                    {/*<DataGrid*/}
                    {/*    rows={rows}*/}
                    {/*    columns={columns}*/}
                    {/*    pageSize={5}*/}
                    {/*    rowsPerPageOptions={[5]}*/}
                    {/*    disableSelectionOnClick*/}
                    {/*/>*/}
                </div>
            </div>
        </div>
    );
};

export default EmployeesTable;
