import messaging from '@react-native-firebase/messaging';
import { navigate } from '../NavigationRef';

export const handleNotifications = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log({
      remoteMessage,
    });

    const screen = remoteMessage?.data?.screen;
    console.log('screen: onNotificationOpenedApp:', remoteMessage);

    if (screen === 'Incident Details' && remoteMessage?.data?.id) {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'Incidents',
            params: {
              screen: remoteMessage?.data?.screen,
              params: {
                id: remoteMessage?.data?.id,
              },
            },
          },
        });
      }, 1000);
    }
    if (screen === 'ManagerReviewIncidentDetails' && remoteMessage?.data?.id) {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'Manager',
            params: {
              screen: remoteMessage?.data?.screen,
              params: {
                id: remoteMessage?.data?.id,
              },
            },
          },
        });
      }, 1000);
    }
    if (screen === 'ManagerReview') {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'Manager',
            params: {
              screen: remoteMessage?.data?.screen,
              params: {
                // id: remoteMessage?.data?.id
              },
            },
          },
        });
      }, 1000);
    }
    if (screen === 'InvestigationReport' && remoteMessage?.data?.id) {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'Injuries',
            params: {
              screen: 'InvestigationReport',
              params: {
                investigationId: remoteMessage?.data?.id,
              },
            },
          },
        });
      }, 1000);
    }
    if (screen === 'CorrectiveActionDetails' && remoteMessage?.data?.id) {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'Manager',
            params: {
              screen: remoteMessage?.data?.screen,
              params: {
                id: remoteMessage?.data?.id,
              },
            },
          },
        });
      }, 1000);
    }
    if (screen === 'ActionDetails' && remoteMessage?.data?.id) {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'More',
            params: {
              screen: 'ActionStack',
              params: {
                screen: remoteMessage?.data?.screen,
                params: {
                  id: remoteMessage?.data?.id,
                  isAssigneToMe: true,
                },
              },
            },
          },
        });
      }, 1000);
    }

    if (screen === 'ActionScreen' && remoteMessage?.data?.id) {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'More',
            params: {
              screen: 'Action',
              params: {
                screen: remoteMessage?.data?.screen,
                params: {
                  // id: remoteMessage?.data?.id,
                },
              },
            },
          },
        });
      }, 1000);
    }

    if (screen === 'UserSettings') {
      setTimeout(() => {
        navigate('Main', {
          screen: 'BottomTab',
          params: {
            screen: 'More',
            params: {
              screen: 'AccountStack',
              params: {
                screen: remoteMessage?.data?.screen,
                params: {
                  // id: remoteMessage?.data?.id,
                },
              },
            },
          },
        });
      }, 1000);
    }
    console.log('remote notification data1 ', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      const screen = remoteMessage?.data?.screen;
      console.log('screen:getInitialNotification: ', remoteMessage);

      if (screen === 'Incident Details' && remoteMessage?.data?.id) {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'Incidents',
              params: {
                screen: remoteMessage?.data?.screen,
                params: {
                  id: remoteMessage?.data?.id,
                },
              },
            },
          });
        }, 1000);
      }
      if (
        screen === 'ManagerReviewIncidentDetails' &&
        remoteMessage?.data?.id
      ) {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'Manager',
              params: {
                screen: remoteMessage?.data?.screen,
                params: {
                  id: remoteMessage?.data?.id,
                },
              },
            },
          });
        }, 1000);
      }
      if (screen === 'ManagerReview') {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'Manager',
              params: {
                screen: remoteMessage?.data?.screen,
                params: {
                  // id: remoteMessage?.data?.id
                },
              },
            },
          });
        }, 1000);
      }
      if (screen === 'InvestigationReport' && remoteMessage?.data?.id) {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'Injuries',
              params: {
                screen: 'InvestigationReport',
                params: {
                  investigationId: remoteMessage?.data?.id,
                },
              },
            },
          });
        }, 1000);
      }
      if (screen === 'CorrectiveActionDetails' && remoteMessage?.data?.id) {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'Manager',
              params: {
                screen: remoteMessage?.data?.screen,
                params: {
                  id: remoteMessage?.data?.id,
                },
              },
            },
          });
        }, 1000);
      }
      if (screen === 'ActionDetails' && remoteMessage?.data?.id) {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'More',
              params: {
                screen: 'ActionStack',
                params: {
                  screen: remoteMessage?.data?.screen,
                  params: {
                    id: remoteMessage?.data?.id,
                    isAssigneToMe: true,
                  },
                },
              },
            },
          });
        }, 1000);
      }
      if (screen === 'ActionScreen' && remoteMessage?.data?.id) {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'More',
              params: {
                screen: 'Action',
                params: {
                  screen: remoteMessage?.data?.screen,
                  params: {
                    // id: remoteMessage?.data?.id,
                  },
                },
              },
            },
          });
        }, 1000);
      }
      if (screen === 'UserSettings') {
        setTimeout(() => {
          navigate('Main', {
            screen: 'BottomTab',
            params: {
              screen: 'More',
              params: {
                screen: 'AccountStack',
                params: {
                  screen: remoteMessage?.data?.screen,
                  params: {
                    // id: remoteMessage?.data?.id,
                  },
                },
              },
            },
          });
        }, 1000);
      }
      console.log('remote notification data2 ', remoteMessage);
    });
};
export const handleNavigationFromNotification = (data: any) => {
  console.log('screen: onNotificationOpenedApp:', data.screen);

  if (data.screen === 'Incident Details') {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'Incidents',
          params: {
            screen: data?.screen,
            params: {
              id: data?.id,
            },
          },
        },
      });
    }, 500);
  }
  if (data.screen === 'ManagerReviewIncidentDetails' && data?.id) {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'Manager',
          params: {
            screen: data?.screen,
            params: {
              id: data?.id,
            },
          },
        },
      });
    }, 500);
  }
  if (data.screen === 'InvestigationReport' && data?.id) {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'Injuries',
          params: {
            screen: data?.screen,
            params: {
              investigationId: data?.id,
            },
          },
        },
      });
    }, 500);
  }
  if (data.screen === 'ManagerReview') {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'Manager',
          params: {
            screen: data?.screen,
            params: {
              // id: data?.id
            },
          },
        },
      });
    }, 500);
  }
  if (data.screen === 'CorrectiveActionDetails' && data?.id) {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'Manager',
          params: {
            screen: data?.screen,
            params: {
              id: data?.id,
            },
          },
        },
      });
    }, 500);
  }
  if (data.screen === 'ActionScreen' && data?.id) {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'More',
          params: {
            screen: 'ActionStack',
            params: {
              screen: data?.screen,
              params: {
                // id: data?.id
              },
            },
          },
        },
      });
    }, 500);
  }
  if (data.screen === 'ActionDetails' && data?.id) {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'More',
          params: {
            screen: 'ActionStack',
            params: {
              screen: data?.screen,
              params: {
                id: data?.id,
                isAssigneToMe: true,
              },
            },
          },
        },
      });
    }, 500);
  }
  if (data.screen === 'UserSettings') {
    setTimeout(() => {
      navigate('Main', {
        screen: 'BottomTab',
        params: {
          screen: 'More',
          params: {
            screen: 'AccountStack',
            params: {
              screen: data?.screen,
              params: {
                // id: data?.id,
              },
            },
          },
        },
      });
    }, 500);
  }
  console.log('remote notification data1 ', data);
};
