import StoreModule from "../module";

class UserState extends StoreModule {

    initState() {
        return {
            params: {
                _id: "",
                email: "",
                profile: {
                    name: "",
                    phone: "",
                    avatar: "",
                },
                token: "",
                waiting: false, // признак ожидания загрузки
                error: "",
            },
            auth: false,
        }
    }

    async login({ login, password, navigate }) {
        this.setState({
            params: {
                ...this.initState().params,
                waiting: true
            },
        });
        try {
            const response = await fetch("/api/v1/users/sign", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password })
            });
            const json = await response.json();
            // return console.log(json);

            if (response.ok) {
                this.setState({
                    params: {
                        _id: json.result.user._id,
                        email: json.result.user.email,
                        profile: {
                            name: json.result.user.profile.name,
                            phone: json.result.user.profile.phone,
                            avatar: json.result.user.profile.avatar,
                        },
                        token: json.result.token,
                        waiting: false,
                        error: "",
                    },
                    auth: true,
                });
                localStorage.setItem('X-Token', json.result.token);
                navigate("/")
            } else {
                this.setState({
                    params: {
                        ...this.getState().params,
                        error: `${json.error.message}! ${json.error.data.issues[0].message}`,
                        waiting: false,
                    },
                    auth: false,
                })
            }
        } catch (e) {
            this.setState({
                params: {
                    ...this.initState().params,
                    error: e.message,
                    waiting: false,
                },
                auth: false,
            });
            localStorage.removeItem('X-Token');
        }
    }

    async logout() {
        if (this.getState().params.token) {
            this.setState({
                params: {
                    ...this.getState().params,
                    waiting: true,
                },
                auth: false,
            });
            try {
                const response = await fetch("/api/v1/users/sign", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Token": this.getState().params.token,
                    },
                });
                const json = await response.json();
                if (json.result) {
                    this.setState({
                        ...this.initState(),
                    })
                    localStorage.removeItem('X-Token');
                } else {
                    this.setState({
                        params: {
                            ...this.initState().params,
                            waiting: false,
                        },
                        auth: false,
                    })
                }
            } catch (e) {
                this.setState({
                    ...this.initState(),
                });
            }
        }
    }

    async self(token) {
        this.setState({
            params: {
                ...this.getState().params,
                waiting: true,
            },
            auth: false,
        });
        try {
            const response = await fetch("/api/v1/users/self?fields=*", {
                headers: {
                    "Content-Type": "application/json",
                    "X-Token": token,
                }
            });
            const json = await response.json();

            if (response.ok) {
                this.setState({
                    params: {
                        _id: json.result._id,
                        email: json.result.email,
                        profile: {
                            name: json.result.profile.name,
                            phone: json.result.profile.phone,
                            avatar: json.result.profile.avatar,
                        },
                        token: token,
                        waiting: false,
                        error: "",
                    },
                    auth: true,
                });
            } else {
                this.setState({
                    params: {
                        ...this.getState().params,
                        waiting: false,
                    },
                    auth: false,
                })
            }
        } catch (e) {
            this.setState({
                params: {
                    ...this.getState().params,
                    waiting: false,
                },
                auth: false,
            });
        }
    }
}

export default UserState