export const wizardObject = {
    name: 'firstWizard',
    steps: {
        firstStep: {
            number: 0,
            label: 'First step',
            sections: {
                profileData: {
                    label: 'Profile Data',
                    type: 'inputs',
                    fields: {
                        firstName: {
                            label: 'Name',
                            required: true
                        },
                        age: {
                            label: 'Age',
                            required: true,
                            type: 'number'
                        },
                        email: {
                            label: 'Email',
                            type: 'email',
                            required: true
                        }
                    }
                },
                ownerData: {
                    label: 'Owner Data',
                    type: 'inputs',
                    fields: {
                        firstName: {
                            label: 'Name',
                            required: true
                        }
                    }
                },
                tableData: {
                    label: 'Table data',
                    type: 'table',
                    fields: {
                        name: {
                            label: 'Name',
                        },
                        age: {
                            label: 'Age'
                        },
                        email: {
                            label: 'Email'
                        }
                    }
                }
            }
        },

        secondStep: {
            number: 1,
            label: 'Second step',
            name: 'secondStep',
            description: 'this is the Second Step description',
            sections: {
                profileSummery: {
                    label: 'Profile Summery',
                    type: 'summery'
                },
                chartData: {
                    label: 'Chart data',
                    type: 'chart',
                    chartType: 'doughnut',
                    data: {
                        labels: [
                            'Red',
                            'Green',
                            'Yellow'
                        ],
                        datasets: [{
                            data: [300, 50, 100],
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56'
                            ],
                            hoverBackgroundColor: [
                                '#FE9BB0',
                                '#6BB6E9',
                                '#FFDF90'
                            ]
                        }]
                    }
                }
            }
        },
        thirdStep: {
            number: 2,
            label: 'Third step',
            name: 'thirdStep',
            description: 'this is the Third Step description',
            sections: {
                tableData: {
                    label: 'Table data 4',
                    type: 'table',
                    fields: [
                        {
                            name: 'aName',
                            label: 'Name',
                        },
                        {
                            name: 'anAge',
                            label: 'Age'
                        },
                        {
                            name: 'anEmail',
                            label: 'Email'
                        }
                    ]
                },
                profileData: {
                    label: 'Profile Data 3',
                    type: 'inputs',
                    fields: [
                        {
                            name: 'aName',
                            label: 'Name',
                            required: true
                        },
                        {
                            name: 'anAge',
                            label: 'Age',
                            required: true,
                            type: 'number'
                        },
                        {
                            name: 'anEmail',
                            label: 'Email',
                            type: 'email',
                            required: true
                        }
                    ]
                },

            }
        },

        forthStep: {
            number: 3,
            label: 'Forth step',
            name: 'forthStep',
            description: 'this is the fourth step description',
            sections: {
                profileSummery: {
                    label: 'Profile Summery 3',
                    type: 'summery'
                },
                chartData: {
                    label: 'Chart data 4',
                    type: 'chart',
                    chartType: 'bar',
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [
                            {
                                label: 'My First dataset',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: [65, 59, 80, 81, 56, 55, 40]
                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false
                    }
                }

            }
        }
    }
}