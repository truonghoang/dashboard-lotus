import React from 'react'
import { CopyOutlined } from "@ant-design/icons"
import { Modal, Button, Col, Row, message } from "antd"
import "@/styles/Detail.scss"
// eslint-disable-next-line react/prop-types
function DetailForm({ title = "DETAIL", item = {},open=false,onOpen =()=>{} , onClose=()=>{} }) {
    
    const [messageApi, contextHolder] = message.useMessage();

    const result = Object.entries(item)
    return (
        <div>
            {contextHolder}
           
            <Modal title={title} 
            footer={
            <Button style={{ marginTop: 10 }} onClick={() => {
                onClose()
            }}>
            Close
            </Button>}
             open={open} onCancel={() => { onClose() }} onOk={() => { onOpen() }}>

                {
                    result.map(([key, value], index) => {
                        return (
                            <Row style={{ margin: "10px 0px" }} key={index}> <Col span={8}>{key}</Col> <Col span={14}>{value}</Col><Col span={1}><CopyOutlined className='copy-icon' onClick={() => {
                                navigator.clipboard.writeText(value).then(() => {
                                    messageApi.open({
                                        type: 'success',
                                        content: 'copy successfully',
                                    });
                                })
                            }} /></Col></Row>

                        )
                    })
                }
            </Modal>
        </div>
    )
}

export default DetailForm