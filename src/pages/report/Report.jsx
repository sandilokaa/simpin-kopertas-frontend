import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Card,
    Button,
    InputGroup,
    Form
} from "react-bootstrap";
import HomeLayout from "../../layouts/home/HomeLayout";
import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CurrencyFormatter from "../../assets/js/currencyFormatter";

const Report = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

    /* -------------------- End Global Variable -------------------- */


    /* -------------------- Current User -------------------- */

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentUserRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {

                    setUser(currentUserResponse.data.currentUser);

                }

            } catch (err) {

                setIsLoggedIn(false);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* -------------------- End Current User -------------------- */


    /* -------------------- Handle Download Mandatory Saving Report -------------------- */

    /* -------------------- Handle Selected Date -------------------- */

    const [selectedMonthMandatory, setSelectedMonthMandatory] = useState('');
    const [selectedYearMandatory, setSelectedYearMandatory] = useState('');

    const handleMonthMandatoryChange = (e) => {

        const selectedMonthValue = e.target.value;

        setSelectedMonthMandatory(selectedMonthValue);

    };

    const handleYearMandatoryChange = (e) => {

        const selectedYearValue = e.target.value;

        setSelectedYearMandatory(selectedYearValue);

    };

    /* -------------------- End Handle Selected Date -------------------- */

    const handleGetMandatorySaving = async () => {

        const token = localStorage.getItem("token");

        const userId = localStorage.getItem("userId");

        const mandatorySavingDataRequest = await axios.get(
            `http://localhost:8080/api/v1/${userId}/mandatory-saving?depositeDate=${selectedYearMandatory}-${selectedMonthMandatory}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        const getMandatorySavingResponse = await mandatorySavingDataRequest.data.data.handleGetedMandatorySavingByUserId;

        return getMandatorySavingResponse;
    };


    const createPDFToMandatorySavingReport = async () => {

        const getMandatorySavingResponse = await handleGetMandatorySaving();

        /* --------- Handle Accumulate Total Mandatory saving --------- */

        const getSubTotal = []

        getSubTotal.push(...getMandatorySavingResponse.map(item => item.nominal));

        const convertedSubTotal = getSubTotal.map(item => parseFloat(item));

        const total = convertedSubTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        /* --------- End Handle Accumulate Total Mandatory saving --------- */

        if (getMandatorySavingResponse) {

            const doc = new jsPDF();

            /* ------ Set Title ------ */

            doc.setFont('Times-Roman');
            doc.setFontSize(14);
            doc.text('Simpin Kopertas', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text('Laporan Bulanan Data Simpanan Wajib', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text(`${selectedYearMandatory}-${selectedMonthMandatory}`, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text('Jalan Akpol (Akademi Polines) No.112', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

            /* ------ End Set Title ------ */

            /* ------ Set Table ------ */

            const tableData = []

            tableData.push(['No', 'Nama', 'Nomor Anggota', 'Tanggal Simpanan', 'Nominal']);

            getMandatorySavingResponse.map((item, index) => {
                return tableData.push([index + 1, item.name, item.User.memberNumber, item.depositeDate, CurrencyFormatter(item.nominal)]);
            });

            tableData.push([`Total`, ``, ``, ``, `${CurrencyFormatter(total)}`]);

            const startY = 60;

            doc.autoTable({
                head: tableData.slice(0, 1),
                body: tableData.slice(1),
                startY: startY,
                margin: { top: startY + 15 },
                theme: 'grid',
                headStyles: { fillColor: [0, 0, 0] },
                alternateRowStyles: { fillColor: [235, 235, 235] },
            });

            /* ------ End Set Table ------ */

            /* ------ Unduh dokumen PDF ------ */

            doc.save('mandatory-report-note.pdf', { autoDownload: false });

        }
    };

    /* -------------------- End Handle Download Mandatory Saving Report -------------------- */


    /* -------------------- Handle Download Voluntary Saving Report -------------------- */

    /* -------------------- Handle Selected Date -------------------- */

    const [selectedMonthVoluntary, setSelectedMonthVoluntary] = useState('');
    const [selectedYearVoluntary, setSelectedYearVoluntary] = useState('');

    const handleMonthVoluntaryChange = (e) => {

        const selectedMonthValue = e.target.value;

        setSelectedMonthVoluntary(selectedMonthValue);

    };

    const handleYearVoluntaryChange = (e) => {

        const selectedYearValue = e.target.value;

        setSelectedYearVoluntary(selectedYearValue);

    };

    /* -------------------- End Handle Selected Date -------------------- */

    const handleGetVoluntarySaving = async () => {

        const token = localStorage.getItem("token");

        const userId = localStorage.getItem("userId");

        const voluntarySavingDataRequest = await axios.get(
            `http://localhost:8080/api/v1/${userId}/voluntary-saving?depositeDate=${selectedYearVoluntary}-${selectedMonthVoluntary}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );

        const getVoluntarySavingResponse = await voluntarySavingDataRequest.data.data.handleGetedVoluntarySavingByUserId;

        return getVoluntarySavingResponse;
    };


    const createPDFToVoluntarySavingReport = async () => {

        const getVoluntarySavingResponse = await handleGetVoluntarySaving();

        /* --------- Handle Accumulate Total Voluntary saving --------- */

        const getSubTotal = []

        getSubTotal.push(...getVoluntarySavingResponse.map(item => item.nominal));

        const convertedSubTotal = getSubTotal.map(item => parseFloat(item));

        const total = convertedSubTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        /* --------- End Handle Accumulate Total Voluntary saving --------- */

        if (getVoluntarySavingResponse) {

            const doc = new jsPDF();

            /* ------ Set Title ------ */

            doc.setFont('Times-Roman');
            doc.setFontSize(14);
            doc.text('Simpin Kopertas', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text('Laporan Bulanan Data Simpanan Sukarela', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text(`${selectedYearVoluntary}-${selectedMonthVoluntary}`, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text('Jalan Akpol (Akademi Polines) No.112', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

            /* ------ End Set Title ------ */

            /* ------ Set Table ------ */

            const tableData = []

            tableData.push(['No', 'Nama', 'Nomor Anggota', 'Tanggal Simpanan', 'Nominal']);

            getVoluntarySavingResponse.map((item, index) => {
                return tableData.push([index + 1, item.name, item.User.memberNumber, item.depositeDate, CurrencyFormatter(item.nominal)]);
            });

            tableData.push([`Total`, ``, ``, ``, `${CurrencyFormatter(total)}`]);

            const startY = 60;

            doc.autoTable({
                head: tableData.slice(0, 1),
                body: tableData.slice(1),
                startY: startY,
                margin: { top: startY + 15 },
                theme: 'grid',
                headStyles: { fillColor: [0, 0, 0] },
                alternateRowStyles: { fillColor: [235, 235, 235] },
            });

            /* ------ End Set Table ------ */

            /* ------ Unduh dokumen PDF ------ */

            doc.save('voluntary-report-note.pdf', { autoDownload: false });

        }
    };

    /* -------------------- End Handle Download Voluntary Saving Report -------------------- */


    /* -------------------- Handle Download Loan Report -------------------- */

    /* -------------------- Handle Selected Date -------------------- */

    const [selectedMonthLoan, setSelectedMonthLoan] = useState('');
    const [selectedYearLoan, setSelectedYearLoan] = useState('');

    const handleMonthLoanChange = (e) => {

        const selectedMonthValue = e.target.value;

        setSelectedMonthLoan(selectedMonthValue);

    };

    const handleYearLoanChange = (e) => {

        const selectedYearValue = e.target.value;

        setSelectedYearLoan(selectedYearValue);

    };

    /* -------------------- End Handle Selected Date -------------------- */

    const handleGetLoan = async () => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const loanDataRequest = await axios.get(
            `http://localhost:8080/api/v1/${userId}/loan?loanDate=${selectedYearLoan}-${selectedMonthLoan}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Access-Control-Allow-Origin": "*"
                },
            }
        );


        const getLoanResponse = await loanDataRequest.data.data.handleGetedLoanByUserId;

        return getLoanResponse;

    };

    const createPDFToLoanReport = async () => {

        const getLoanResponse = await handleGetLoan();

        if (getLoanResponse) {

            const doc = new jsPDF();

            /* ------ Set Title ------ */

            doc.setFont('Times-Roman');
            doc.setFontSize(14);
            doc.text('Simpin Kopertas', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text('Laporan Bulanan Data Pinjaman', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text(`${selectedYearLoan}-${selectedMonthLoan}`, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text('Jalan Akpol (Akademi Polines) No.112', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

            /* ------ End Set Title ------ */

            /* ------ Set Table ------ */

            const tableData = []

            tableData.push(['No', 'Nama', 'Nomor Anggota', 'Tipe Pinjaman', 'Tanggal Pinjaman', 'Nominal']);

            getLoanResponse.map((item, index) => {
                return tableData.push([index + 1, item.name, item.User.memberNumber, item.LoanType.type, item.loanDate, CurrencyFormatter(item.nominal)]);
            });

            const startY = 60;

            doc.autoTable({
                head: tableData.slice(0, 1),
                body: tableData.slice(1),
                startY: startY,
                margin: { top: startY + 15 },
                theme: 'grid',
                headStyles: { fillColor: [0, 0, 0] },
                alternateRowStyles: { fillColor: [235, 235, 235] },
            });

            /* ------ End Set Table ------ */

            /* ------ Unduh dokumen PDF ------ */

            doc.save('loan-report-note.pdf', { autoDownload: false });

        }
    };

    /* -------------------- End Handle Download Loan Report -------------------- */

    return isLoggedIn ? (

        <HomeLayout>
            <Container>
                <div id="print-report">
                    <Row>
                        <Col className="col-12 col-lg-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h6>Simpanan Wajib</h6>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>Cetak laporan ini jika diperlukan dengan memilih tahun dan bulan lalu klik tombol Download.</p>
                                    </Card.Text>
                                    <InputGroup className="mb-3 simpin-search-group">
                                        <Form.Select aria-label="Default select example" value={selectedYearMandatory} onChange={handleYearMandatoryChange}>
                                            <option>Tahun</option>
                                            <option value="2023">2024</option>
                                            <option value="2022">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                        </Form.Select>
                                        <Form.Select aria-label="Default select example" value={selectedMonthMandatory} onChange={handleMonthMandatoryChange}>
                                            <option>Bulan</option>
                                            <option value="01">Januari</option>
                                            <option value="02">Februari</option>
                                            <option value="03">Maret</option>
                                            <option value="04">April</option>
                                            <option value="05">Mei</option>
                                            <option value="06">Juni</option>
                                            <option value="07">Juli</option>
                                            <option value="08">Agustus</option>
                                            <option value="09">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </Form.Select>
                                    </InputGroup>
                                    <Button className="btn-download-report" onClick={createPDFToMandatorySavingReport}>
                                        Download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h6>Simpanan Sukarela</h6>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>Cetak laporan ini jika diperlukan dengan memilih tahun dan bulan lalu klik tombol Download.</p>
                                    </Card.Text>
                                    <InputGroup className="mb-3 simpin-search-group">
                                        <Form.Select aria-label="Default select example" value={selectedYearVoluntary} onChange={handleYearVoluntaryChange}>
                                            <option>Tahun</option>
                                            <option value="2022">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                        </Form.Select>
                                        <Form.Select aria-label="Default select example" value={selectedMonthVoluntary} onChange={handleMonthVoluntaryChange}>
                                            <option>Bulan</option>
                                            <option value="01">Januari</option>
                                            <option value="02">Februari</option>
                                            <option value="03">Maret</option>
                                            <option value="04">April</option>
                                            <option value="05">Mei</option>
                                            <option value="06">Juni</option>
                                            <option value="07">Juli</option>
                                            <option value="08">Agustus</option>
                                            <option value="09">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </Form.Select>
                                    </InputGroup>
                                    <Button className="btn-download-report" onClick={createPDFToVoluntarySavingReport}>
                                        Download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="col-12 col-lg-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h6>Pinjaman</h6>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>Cetak laporan ini jika diperlukan dengan memilih tahun dan bulan lalu klik tombol Download.</p>
                                    </Card.Text>
                                    <InputGroup className="mb-3 simpin-search-group">
                                        <Form.Select aria-label="Default select example" value={selectedYearLoan} onChange={handleYearLoanChange}>
                                            <option>Tahun</option>
                                            <option value="2022">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                        </Form.Select>
                                        <Form.Select aria-label="Default select example" value={selectedMonthLoan} onChange={handleMonthLoanChange}>
                                            <option>Bulan</option>
                                            <option value="01">Januari</option>
                                            <option value="02">Februari</option>
                                            <option value="03">Maret</option>
                                            <option value="04">April</option>
                                            <option value="05">Mei</option>
                                            <option value="06">Juni</option>
                                            <option value="07">Juli</option>
                                            <option value="08">Agustus</option>
                                            <option value="09">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </Form.Select>
                                    </InputGroup>
                                    <Button className="btn-download-report" onClick={createPDFToLoanReport}>
                                        Download
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </HomeLayout>

    ) : (navigate("/login"));

};

export default Report;