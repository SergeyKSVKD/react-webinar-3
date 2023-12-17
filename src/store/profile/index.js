import StoreModule from "../module";

class ProfileState extends StoreModule {

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
                waiting: false, // признак ожидания загрузки
                error: "",
            },
        }
    }

    async getProfile(token, url="657db993712d3e4b12ce27ed") {
        this.setState({
            params: {
                ...this.getState().params,
                waiting: true,
            },
        });
        try {
            const response = await fetch(`/api/v1/users/${url}`, {
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
                        waiting: false,
                        error: "",
                    },
                });
            } else {
                this.setState({
                    params: {
                        ...this.getState().params,
                        waiting: false,
                        error: `${response.status} ${response.statusText}`
                    },
                })
            }
        } catch (e) {
            this.setState({
                params: {
                    ...this.getState().params,
                    waiting: false,
                },
            });
        }
    }
}

export default ProfileState