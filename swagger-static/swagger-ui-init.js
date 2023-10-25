
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/sa/users": {
        "get": {
          "operationId": "SaUsersController_getUsers",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "post": {
          "operationId": "SaUsersController_createUser",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/sa/users/{id}": {
        "delete": {
          "operationId": "SaUsersController_deleteUser",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            }
          }
        }
      },
      "/delete/all-data": {
        "delete": {
          "operationId": "DeleteController_deleteAllData",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/sa/quests": {
        "post": {
          "operationId": "QuestsController_createQuest",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateQuestDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          }
        },
        "put": {
          "operationId": "QuestsController_approveQuest",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/QuestApproveDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      }
    },
    "info": {
      "title": "PaCh game example",
      "description": "The PaCh game API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "PaCh game",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "login": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "phoneNumber": {
              "type": "string"
            },
            "age": {
              "type": "number"
            }
          },
          "required": [
            "login",
            "password",
            "email",
            "phoneNumber",
            "age"
          ]
        },
        "CreateQuestDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "questContent": {
              "type": "string"
            }
          },
          "required": [
            "title",
            "questContent"
          ]
        },
        "QuestApproveDto": {
          "type": "object",
          "properties": {
            "approved": {
              "type": "boolean"
            },
            "questId": {
              "type": "string"
            }
          },
          "required": [
            "approved",
            "questId"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
