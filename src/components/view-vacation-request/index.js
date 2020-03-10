import React, { Component } from "react";

class ViewVacationRequest extends Component{

    constructor(props){
        super(props);
        this.state = {
            owner : "No owner",
            title : "No title",
            startDate : "No start date", 
            endDate : "No end date",
            comment : "No comment",
            status : "No status"
        }
    }

    componentDidMount(){
        let url = "";
        if (url === ""){
            console.log("not fetching");
        } else {
            //GET /request/:user_id
            fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                this.setState({
                    owner : resp.owner_id,
                    title: resp.title,
                    startDate : resp.period_start,
                    endDate : resp.period_end
                });
                console.log(resp.name)

                //GET /request/:request_id/comment
                var comments = [];
                fetch(url)
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    resp.forEach(message => {
                        comments.push("message")
                    });
                    this.setState({
                        comment: comments
                    })
                }).catch(err => console.log(err))
                
                //GET /request/:status_id/status
                fetch(url)
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    this.setState({
                        status: resp.status
                    })
                }).catch(err => console.log(err))

            }).catch(err => console.log(err))
        }
    }

    render() {
        return (
        <div>
            <h1>View vacation request</h1>
            <p>Should show the full detail pertaining to a single vacation request.</p>
            <div>
                <p>{this.state.owner}</p>
                <p>{this.state.title}</p>
                <p>{this.state.startDate}</p>
                <p>{this.state.endDate}</p>
                <p>{this.state.comment}</p>
                <p>{this.state.status}</p>
            </div>
        </div>)

    }
}

export default ViewVacationRequest;