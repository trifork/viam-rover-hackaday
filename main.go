package main

import (
  "context"

  "github.com/edaniels/golog"
  "go.viam.com/rdk/robot/client"
  "go.viam.com/rdk/utils"
  "go.viam.com/utils/rpc"
  "go.viam.com/rdk/components/board"
  "go.viam.com/rdk/components/motor"
  "go.viam.com/rdk/components/base"
  "go.viam.com/rdk/components/camera"
  "go.viam.com/rdk/components/encoder"
  "go.viam.com/rdk/components/movementsensor"
  "fmt"
)

func main() {
  fmt.Println("Hello, World!")

  logger := golog.NewDevelopmentLogger("client")
  robot, err := client.New(
      context.Background(),
      "iamrobot-main.nm13vq5v0p.viam.cloud",
      logger,
      client.WithDialOptions(rpc.WithCredentials(rpc.Credentials{
          Type:    utils.CredentialsTypeRobotLocationSecret,
          Payload: "z2gge28enxx9a1vlh2ue9iq4j1konikoihoabd9z3qi1p39w",
      })),
  )
  if err != nil {
      logger.Fatal(err)
  }
 
  defer robot.Close(context.Background())
  logger.Info("Resources:")
  logger.Info(robot.ResourceNames())
  
  
  // Note that the pin supplied is a placeholder. Please change this to a valid pin.
  // local
  localComponent, err:= board.FromRobot(robot, "local")
  if err!=nil {
    logger.Error(err)
    return
  }
  localReturnValue, err:= localComponent.GPIOPinByName("16")
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("local GPIOPinByName return value: %+v", localReturnValue)
  
  // right
  rightComponent, err:= motor.FromRobot(robot, "right")
  if err!=nil {
    logger.Error(err)
    return
  }
  rightReturnValue, err:= rightComponent.IsMoving(context.Background())
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("right IsMoving return value: %+v", rightReturnValue)
  
  // left
  leftComponent, err:= motor.FromRobot(robot, "left")
  if err!=nil {
    logger.Error(err)
    return
  }
  leftReturnValue, err:= leftComponent.IsMoving(context.Background())
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("left IsMoving return value: %+v", leftReturnValue)
  
  // viam_base
  viamBaseComponent, err:= base.FromRobot(robot, "viam_base")
  if err!=nil {
    logger.Error(err)
    return
  }
  viamBaseReturnValue, err:= viamBaseComponent.IsMoving(context.Background())
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("viam_base IsMoving return value: %+v", viamBaseReturnValue)
  
  // cam
  camComponent, err:= camera.FromRobot(robot, "cam")
  if err!=nil {
    logger.Error(err)
    return
  }
  camReturnValue, err:= camComponent.Properties(context.Background())
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("cam Properties return value: %+v", camReturnValue)
  
  // Renc
  rencComponent, err:= encoder.FromRobot(robot, "Renc")
  if err!=nil {
    logger.Error(err)
    return
  }
  rencReturnValue, err:= rencComponent.Properties(context.Background(), map[string]interface{}{})
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("Renc Properties return value: %+v", rencReturnValue)
  
  // Lenc
  lencComponent, err:= encoder.FromRobot(robot, "Lenc")
  if err!=nil {
    logger.Error(err)
    return
  }
  lencReturnValue, err:= lencComponent.Properties(context.Background(), map[string]interface{}{})
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("Lenc Properties return value: %+v", lencReturnValue)
  
  // accelerometer
  accelerometerComponent, err:= movementsensor.FromRobot(robot, "accelerometer")
  if err!=nil {
    logger.Error(err)
    return
  }
  accelerometerReturnValue, err:= accelerometerComponent.LinearAcceleration(context.Background(), map[string]interface{}{})
  if err!=nil {
    logger.Error(err)
    return
  }
  logger.Infof("accelerometer LinearAcceleration return value: %+v", accelerometerReturnValue)
}
