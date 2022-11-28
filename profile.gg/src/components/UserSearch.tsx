import React, { useEffect, useState } from "react";
import ValorantAPI, {
  AccountFetchOptions,
  APIResponse,
} from "unofficial-valorant-api";
import { Button, Row, Col, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components.css"

const api = new ValorantAPI();

async function getUserInfo(
  username: string,
  setLoading: Function,
  setLabelBotao: Function,
  setUserData: Function,
  navigate: Function,
) {
  if (username.length > 0 && username.includes("#")) {
    const name = username.split("#")[0];
    const tag = username.split("#")[1];
    const accountFetchOptions: AccountFetchOptions = {
      name,
      tag,
    };
    console.log(accountFetchOptions);
    setLoading(true);
    setLabelBotao("...");
    api.getAccount(accountFetchOptions).then((getAccountResponse) => {
      if (getAccountResponse.error) {
        (getAccountResponse.error as any).forEach((error) => {
          console.log(error.message);
          setLoading(false);
          setLabelBotao("Generate");
        });
      }
      if (getAccountResponse.data) {
        api
          .getMatchesByPUUID({
            puuid: (getAccountResponse.data as any).puuid,
            region: "br",
            size: 10,
          })
          .then((getMatchesResponse) => {
            console.log(getMatchesResponse.data);
            setUserData(getMatchesResponse.data);
            setLoading(false);
            setLabelBotao("Generate");
            navigate("/profile")
          });
      }
    });
  } else {
    console.log("Digita um trem válido por favor :/");
  }
}

function UserSearch(props: any) {
  const { setUserData,username, setUsername } = props;
  
  const [loading, setLoading] = useState(false);
  const [labelBotao, setLabelBotao] = useState("Generate");
  const navigate = useNavigate();
  return (
    <div id="background-login">
      <InputGroup className="mb-3 my-input" size="lg">
        <InputGroup.Text id="username-input">@</InputGroup.Text>
        <Form.Control
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username#TAG"
          aria-label="Username"
          aria-describedby="username-input"
          onKeyUp={({ key }) => {
            if (key === "Enter") {
              getUserInfo(
                username,
                setLoading,
                setLabelBotao,
                setUserData,
                navigate)
            }
          }}
        />
        <Button
          style={{ width: "150px" }}
          variant="success"
          onClick={() => {
            getUserInfo(
              username,
              setLoading,
              setLabelBotao,
              setUserData,
              navigate)
          }}
          disabled={loading}
        >
          {labelBotao}
        </Button>
      </InputGroup>

    </div>
  );
}

export default UserSearch;
