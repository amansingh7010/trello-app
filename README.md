# TrelloApp

This application uses Trello OAuth API and MongoDB to perform CRUD operations on a Trello Board.

## Deployment

https://zingy-choux-424964.netlify.app

---

## Workflow

1. Login using your Trello Account.
2. Board is public and all cards can be viewed on the dashboard.
3. Must accept Workspace invite using the invite link to be able to create, update and delete cards.
   Invite Link: https://trello.com/invite/userapp45/ATTIdee15fbf953033376048319b26e0d47b86CE2029
4. Cick on 'New' Button to create a card.
5. Click on any card for update or delete operations.

---

## API Endpoints

#### Authentication

<details>
 <summary><code>GET</code> <code><b>/login</b></code> <code>(Initiates Trello OAuth Login)</code></summary>

##### Parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | None | required | N/A       | N/A         |

##### Responses

> | http code | content-type               | response                     |
> | --------- | -------------------------- | ---------------------------- |
> | `200`     | `application/json        ` | `{"authUrl": "URL"}`         |
> | `400`     | `application/json`         | `{"error": "Error Message"}` |
> | `500`     | `application/json`         |                              |

</details>

<details>
 <summary><code>GET</code> <code><b>/callback?oauth_token={token}&oauth_verifier={verifier}</b></code> <code>(Handles callback from Trello)</code></summary>

##### Parameters

> | name           | type     | data type | description |
> | -------------- | -------- | --------- | ----------- |
> | oauth_token    | required | string    | N/A         |
> | oauth_verifier | required | string    | N/A         |

##### Responses

> | http code | content-type               | response                                                              |
> | --------- | -------------------------- | --------------------------------------------------------------------- |
> | `200`     | `application/json        ` | `{"token": "asjdbaasdasdasjdhhjabkasdbkajsdh"}`                       |
> | `400`     | `application/json`         | `{"error": "Missing query params 'oauth_token' or 'oauth_verifier'"}` |
> | `401`     | `application/json`         | `{"error": "OAuth token expired"}`                                    |
> | `500`     | `application/json`         |                                                                       |

</details>

#### Dashboard

<details>
 <summary><code>GET</code> <code><b>/api/dashboard</b></code> <code>(Fetches dashboard data)</code></summary>

##### Parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | None | required | N/A       | N/A         |

##### Responses

> | http code | content-type               | response                         |
> | --------- | -------------------------- | -------------------------------- |
> | `200`     | `application/json        ` | `{"data": "{name: "John Doe"}"}` |
> | `400`     | `application/json`         | `{"error": "Error Message"}`     |
> | `500`     | `application/json`         |                                  |

</details>

#### Cards

<details>
 <summary><code>GET</code> <code><b>/api/cards</b></code> <code>(Fetches all cards from MongoDB)</code></summary>

##### Parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | None | required | N/A       | N/A         |

##### Responses

> | http code | content-type               | response                                         |
> | --------- | -------------------------- | ------------------------------------------------ |
> | `200`     | `application/json        ` | `[{"name": "Card Name", "desc": "description"}]` |
> | `500`     | `application/json`         |                                                  |

</details>

<details>
 <summary><code>POST</code> <code><b>/api/cards</b></code> <code>(Creates a new card and saves it to MongoDB and Trello)</code></summary>

##### Parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | None | required | N/A       | N/A         |

##### Responses

> | http code | content-type               | response                     |
> | --------- | -------------------------- | ---------------------------- |
> | `201`     | `application/json        ` |                              |
> | `400`     | `application/json`         | `{"error": "Error Message"}` |
> | `500`     | `application/json`         |                              |

</details>

<details>
 <summary><code>PUT</code> <code><b>/api/cards/{id}</b></code> <code>(Updates a card by ID and saves it to MongoDB and Trello)</code></summary>

##### Parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | id   | required | string    | Card ID     |

##### Responses

> | http code | content-type       | response                               |
> | --------- | ------------------ | -------------------------------------- |
> | `200`     | `application/json` |                                        |
> | `400`     | `application/json` | `{"error": "Missing required params"}` |
> | `400`     | `application/json` | `{"error": "Card does not exist"}`     |
> | `500`     | `application/json` |                                        |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/cards/{id}</b></code> <code>(Deletes a card by ID from MongoDB and Trello Board)</code></summary>

##### Parameters

> | name | type     | data type | description |
> | ---- | -------- | --------- | ----------- |
> | id   | required | string    | Card ID     |

##### Responses

> | http code | content-type       | response                               |
> | --------- | ------------------ | -------------------------------------- |
> | `200`     | `application/json` |                                        |
> | `400`     | `application/json` | `{"error": "Missing required params"}` |
> | `400`     | `application/json` | `{"error": "Card does not exist"}`     |
> | `500`     | `application/json` |                                        |

</details>

---

## MongoDB Schemas

#### OAuth Token

| name                | type       |
| ------------------- | ---------- |
| `id`                | `ObjectId` |
| `token`             | `string`   |
| `tokenSecret`       | `string`   |
| `accessToken`       | `string`   |
| `accessTokenSecret` | `string`   |

#### Card

| name            | type       |
| --------------- | ---------- |
| `id`            | `ObjectId` |
| `name`          | `string`   |
| `desc`          | `string`   |
| `trelloCardId`  | `string`   |
| `trelloBoardId` | `string`   |
| `trelloListId`  | `string`   |
