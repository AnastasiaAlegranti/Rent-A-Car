USE [master]
GO
/****** Object:  Database [RentalCar]    Script Date: 04/03/2019 13:08:25 ******/
CREATE DATABASE [RentalCar]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'RentalCar', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\RentalCar.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'RentalCar_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\RentalCar_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [RentalCar] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RentalCar].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RentalCar] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [RentalCar] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [RentalCar] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [RentalCar] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [RentalCar] SET ARITHABORT OFF 
GO
ALTER DATABASE [RentalCar] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RentalCar] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RentalCar] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RentalCar] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RentalCar] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [RentalCar] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [RentalCar] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RentalCar] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [RentalCar] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RentalCar] SET  DISABLE_BROKER 
GO
ALTER DATABASE [RentalCar] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RentalCar] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RentalCar] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RentalCar] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RentalCar] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RentalCar] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RentalCar] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RentalCar] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [RentalCar] SET  MULTI_USER 
GO
ALTER DATABASE [RentalCar] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RentalCar] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RentalCar] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RentalCar] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [RentalCar] SET DELAYED_DURABILITY = DISABLED 
GO
USE [RentalCar]
GO
/****** Object:  UserDefinedFunction [dbo].[GetBookedDatesTable]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[GetBookedDatesTable] (@start date=null, @end date=null) returns @dates table (d date) as
begin
 	WHILE @start < @end
	begin
	INSERT INTO @dates (d)values (@start)
	 SET @start = Dateadd(Day,1, @start);
	 end
    RETURN
end ;

GO
/****** Object:  Table [dbo].[Cars]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[ModelID] [int] NOT NULL,
	[CarLicenseNumber] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CarsFleet] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ContactUsMessages]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContactUsMessages](
	[ContactUsID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](20) NOT NULL,
	[LastName] [nvarchar](20) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NOT NULL,
	[Message] [nvarchar](4000) NOT NULL,
	[Subject] [nvarchar](50) NULL,
	[MessageDate] [datetime] NOT NULL,
	[UserId] [int] NULL,
 CONSTRAINT [PK__ContactU__E10B7AE8082A29DA] PRIMARY KEY CLUSTERED 
(
	[ContactUsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Manufacturers]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manufacturers](
	[ManufacturerID] [int] IDENTITY(1,1) NOT NULL,
	[ManufacturerName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Manufacturers] PRIMARY KEY CLUSTERED 
(
	[ManufacturerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Models]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Models](
	[ModelID] [int] IDENTITY(1,1) NOT NULL,
	[ManufacturerID] [int] NOT NULL,
	[ModelName] [nvarchar](50) NOT NULL,
	[ModelPrice] [money] NOT NULL,
	[ModelImageName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Models] PRIMARY KEY CLUSTERED 
(
	[ModelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Orders]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[CarID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[StartRentalDate] [date] NOT NULL,
	[EndRentalDate] [date] NOT NULL,
	[TotalRentalCost] [money] NOT NULL,
	[OrderDate] [datetime] NOT NULL,
 CONSTRAINT [PK_RentalCars] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](20) NOT NULL,
	[LastName] [nvarchar](20) NOT NULL,
	[UserName] [nvarchar](15) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](100) NULL,
	[DateOfBirth] [date] NULL,
	[Role] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[ShowAllCars]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[ShowAllCars] as
select ModelName, ModelImageName,  ManufacturerName,  CarLicenseNumber,CarID, Models.ModelID, Models.ManufacturerID, ModelPrice
from Models inner join Manufacturers 
on Models.ManufacturerID= Manufacturers.ManufacturerID 
inner join Cars as C 
on Models.ModelID=C.ModelID

GO
/****** Object:  View [dbo].[ShowAllOrdersDetails]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[ShowAllOrdersDetails] as
select U.UserId, Manufacturers.ManufacturerID, Models.ModelId ,C.CarId,FirstName, LastName, ManufacturerName, ModelName, ModelImageName,StartRentalDate, EndRentalDate,TotalRentalCost,O.OrderID, O.OrderDate
from Models inner join Manufacturers 
on Models.ManufacturerID= Manufacturers.ManufacturerID 
inner join Cars as C
on Models.ModelID=C.ModelID
inner join Orders as O
on C.CarID=O.CarID
inner join Users as U
on O.UserID=U.UserID

GO
SET IDENTITY_INSERT [dbo].[Cars] ON 

INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (2, 2, N'111-11-110')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (20, 5, N'121-21-121')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (21, 30, N'131-31-132')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (23, 32, N'141-41-143')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (24, 33, N'222-22-222')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (25, 34, N'233-33-344')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (28, 35, N'333-33-333')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (33, 37, N'444-44-444')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (34, 38, N'555-55-555')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (35, 41, N'666-66-666')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (36, 42, N'777-77-77')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (37, 44, N'888-88-888')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (38, 46, N'999-99-999')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (39, 2, N'123-45-678')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (40, 5, N'321-22-654')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (41, 5, N'678-88-999')
INSERT [dbo].[Cars] ([CarID], [ModelID], [CarLicenseNumber]) VALUES (42, 48, N'555-60-555')
SET IDENTITY_INSERT [dbo].[Cars] OFF
SET IDENTITY_INSERT [dbo].[ContactUsMessages] ON 

INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (1, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'13:00', N'dfdf', CAST(N'2019-02-27 00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (2, N'Anastasia', N'alegranti', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'test', N'dfdf', CAST(N'2019-03-04 00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (3, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'Test', N'dfdf', CAST(N'2019-03-04 00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (4, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'11:30', N'dfdf', CAST(N'2019-03-04 00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (5, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'11:31', N'dfdf', CAST(N'2019-03-04 11:31:09.950' AS DateTime), NULL)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (6, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'11:32', N'dfdf', CAST(N'2019-03-04 11:32:15.413' AS DateTime), NULL)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (7, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'11:33', N'dfdf', CAST(N'2019-03-04 11:33:14.807' AS DateTime), NULL)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (8, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'11:36', N'dfdf', CAST(N'2019-03-04 11:36:33.083' AS DateTime), 1)
INSERT [dbo].[ContactUsMessages] ([ContactUsID], [FirstName], [LastName], [Email], [Phone], [Message], [Subject], [MessageDate], [UserId]) VALUES (9, N'admin', N'admin', N'fsdfdsf@dsdsd.com', N'0500-5555555', N'11:37', N'dfdf', CAST(N'2019-03-04 11:37:09.153' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[ContactUsMessages] OFF
SET IDENTITY_INSERT [dbo].[Manufacturers] ON 

INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (1, N'Mazda')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (2, N'Honda')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (3, N'Huindai')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (4, N'BMW')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (5, N'Folxswagen')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (6, N'Audi')
INSERT [dbo].[Manufacturers] ([ManufacturerID], [ManufacturerName]) VALUES (10, N'Toyota')
SET IDENTITY_INSERT [dbo].[Manufacturers] OFF
SET IDENTITY_INSERT [dbo].[Models] ON 

INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (2, 1, N'MX-5', 1000.0000, N'mx5.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (5, 1, N'MAZDA2', 500.0000, N'mazda2.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (30, 1, N'MAZDA3', 600.0000, N'mazda3.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (32, 1, N'MAZDA6', 700.0000, N'mazda6.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (33, 2, N'Civic Sedan', 700.0000, N'civic-sedan.png')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (34, 2, N'Civic Type R', 1000.0000, N'civic-type-r.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (35, 3, N'Accent', 400.0000, N'accent.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (37, 3, N'Santa Fe', 600.0000, N'santa-fe.png')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (38, 4, N'Z4', 1200.0000, N'z4.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (41, 4, N'Z3', 1000.0000, N'z3.png')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (42, 5, N'GOLF', 800.0000, N'golf.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (44, 6, N'A6', 1000.0000, N'a6.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (46, 6, N'Q8', 1000.0000, N'a8.jpg')
INSERT [dbo].[Models] ([ModelID], [ManufacturerID], [ModelName], [ModelPrice], [ModelImageName]) VALUES (48, 10, N'Land Cruiser', 1000.0000, N'10e78285-4f65-40c2-82c3-19b1bccaf2c4.png')
SET IDENTITY_INSERT [dbo].[Models] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (24, 37, 1, CAST(N'2019-02-21' AS Date), CAST(N'2019-02-23' AS Date), 2000.0000, CAST(N'2019-02-13 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (25, 37, 1, CAST(N'2019-02-19' AS Date), CAST(N'2019-02-21' AS Date), 2000.0000, CAST(N'2019-02-13 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (26, 37, 1, CAST(N'2019-02-13' AS Date), CAST(N'2019-02-14' AS Date), 1000.0000, CAST(N'2019-02-13 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (27, 37, 1, CAST(N'2019-02-14' AS Date), CAST(N'2019-02-15' AS Date), 1000.0000, CAST(N'2019-02-13 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (28, 37, 1, CAST(N'2019-02-15' AS Date), CAST(N'2019-02-16' AS Date), 1000.0000, CAST(N'2019-02-13 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (29, 37, 1, CAST(N'2019-02-16' AS Date), CAST(N'2019-02-17' AS Date), 1000.0000, CAST(N'2019-02-13 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (30, 37, 1, CAST(N'2019-03-14' AS Date), CAST(N'2019-03-15' AS Date), 1000.0000, CAST(N'2019-02-13 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (31, 37, 1, CAST(N'2019-02-23' AS Date), CAST(N'2019-02-24' AS Date), 1000.0000, CAST(N'2019-02-14 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (32, 37, 1, CAST(N'2019-02-18' AS Date), CAST(N'2019-02-19' AS Date), 1000.0000, CAST(N'2019-02-14 00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (33, 37, 1, CAST(N'2019-02-17' AS Date), CAST(N'2019-02-18' AS Date), 1000.0000, CAST(N'2019-02-14 09:36:04.080' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (34, 37, 1, CAST(N'2019-03-15' AS Date), CAST(N'2019-03-16' AS Date), 1000.0000, CAST(N'2019-02-14 11:42:06.187' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (35, 38, 1, CAST(N'2019-02-22' AS Date), CAST(N'2019-02-23' AS Date), 1000.0000, CAST(N'2019-02-14 11:44:33.653' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (36, 38, 1, CAST(N'2019-02-18' AS Date), CAST(N'2019-02-20' AS Date), 2000.0000, CAST(N'2019-02-18 20:57:51.400' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (37, 37, 1, CAST(N'2019-03-27' AS Date), CAST(N'2019-03-28' AS Date), 1000.0000, CAST(N'2019-02-18 22:47:15.003' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (38, 2, 1, CAST(N'2019-02-20' AS Date), CAST(N'2019-02-22' AS Date), 2000.0000, CAST(N'2019-02-19 09:44:18.883' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (39, 37, 1, CAST(N'2019-02-27' AS Date), CAST(N'2019-02-28' AS Date), 1000.0000, CAST(N'2019-02-19 22:18:52.767' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (40, 37, 1, CAST(N'2019-02-26' AS Date), CAST(N'2019-02-27' AS Date), 1000.0000, CAST(N'2019-02-19 22:29:40.363' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (41, 37, 1, CAST(N'2019-03-16' AS Date), CAST(N'2019-03-17' AS Date), 1000.0000, CAST(N'2019-02-20 11:15:42.707' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (42, 37, 1, CAST(N'2019-03-13' AS Date), CAST(N'2019-03-14' AS Date), 1000.0000, CAST(N'2019-02-20 11:16:53.847' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (43, 37, 1, CAST(N'2019-03-21' AS Date), CAST(N'2019-03-27' AS Date), 6000.0000, CAST(N'2019-02-20 11:35:12.047' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (44, 37, 1, CAST(N'2019-03-30' AS Date), CAST(N'2019-03-31' AS Date), 1000.0000, CAST(N'2019-02-20 12:59:05.293' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (45, 38, 1, CAST(N'2019-02-21' AS Date), CAST(N'2019-02-22' AS Date), 1000.0000, CAST(N'2019-02-20 15:22:38.293' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (46, 34, 1, CAST(N'2019-03-21' AS Date), CAST(N'2019-03-23' AS Date), 2400.0000, CAST(N'2019-02-21 09:16:23.410' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (47, 35, 1, CAST(N'2019-03-22' AS Date), CAST(N'2019-03-23' AS Date), 1000.0000, CAST(N'2019-02-26 14:26:10.357' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (48, 37, 1, CAST(N'2019-07-16' AS Date), CAST(N'2019-07-17' AS Date), 1000.0000, CAST(N'2019-02-26 14:28:04.603' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (49, 38, 1, CAST(N'2019-05-16' AS Date), CAST(N'2019-05-17' AS Date), 1000.0000, CAST(N'2019-02-27 11:19:17.127' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (50, 38, 1, CAST(N'2019-02-27' AS Date), CAST(N'2019-02-28' AS Date), 1000.0000, CAST(N'2019-02-27 12:26:53.167' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (51, 37, 1, CAST(N'2019-03-07' AS Date), CAST(N'2019-03-08' AS Date), 1000.0000, CAST(N'2019-02-27 12:28:02.327' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (52, 35, 1, CAST(N'2019-03-15' AS Date), CAST(N'2019-03-16' AS Date), 1000.0000, CAST(N'2019-02-27 12:30:34.360' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (53, 34, 31, CAST(N'2019-03-29' AS Date), CAST(N'2019-03-30' AS Date), 1200.0000, CAST(N'2019-03-04 10:59:59.750' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (54, 35, 31, CAST(N'2019-03-29' AS Date), CAST(N'2019-03-30' AS Date), 1000.0000, CAST(N'2019-03-04 11:00:42.183' AS DateTime))
INSERT [dbo].[Orders] ([OrderID], [CarID], [UserID], [StartRentalDate], [EndRentalDate], [TotalRentalCost], [OrderDate]) VALUES (55, 34, 31, CAST(N'2019-03-18' AS Date), CAST(N'2019-03-20' AS Date), 2400.0000, CAST(N'2019-03-04 11:01:56.070' AS DateTime))
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [UserName], [Password], [Phone], [Email], [DateOfBirth], [Role]) VALUES (1, N'admin', N'admin', N'admin', N'7110EDA4D09E062AA5E4A390B0A572AC0D2C0220', N'053-2222222', NULL, NULL, N'Admin')
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [UserName], [Password], [Phone], [Email], [DateOfBirth], [Role]) VALUES (27, N'test', N'test', N'test', N'7110EDA4D09E062AA5E4A390B0A572AC0D2C0220', N'050-5555555', N'fsdfdsf@dsdsd.com', NULL, N'user')
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [UserName], [Password], [Phone], [Email], [DateOfBirth], [Role]) VALUES (31, N'anastasia', N'alegranti', N'anastasia', N'7110EDA4D09E062AA5E4A390B0A572AC0D2C0220', N'0500-5555555', N'fsdfdsf@dsdsd.com', NULL, N'user')
INSERT [dbo].[Users] ([UserID], [FirstName], [LastName], [UserName], [Password], [Phone], [Email], [DateOfBirth], [Role]) VALUES (32, N'Test2', N'test2', N'test2', N'7110EDA4D09E062AA5E4A390B0A572AC0D2C0220', N'0500-5555555', N'fsdfdsf@dsdsd.com', NULL, N'user')
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Models] FOREIGN KEY([ModelID])
REFERENCES [dbo].[Models] ([ModelID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Models]
GO
ALTER TABLE [dbo].[ContactUsMessages]  WITH CHECK ADD  CONSTRAINT [FK_ContactUsMessages_ContactUsMessages] FOREIGN KEY([ContactUsID])
REFERENCES [dbo].[ContactUsMessages] ([ContactUsID])
GO
ALTER TABLE [dbo].[ContactUsMessages] CHECK CONSTRAINT [FK_ContactUsMessages_ContactUsMessages]
GO
ALTER TABLE [dbo].[Models]  WITH CHECK ADD  CONSTRAINT [FK_Models_Manufacturers] FOREIGN KEY([ManufacturerID])
REFERENCES [dbo].[Manufacturers] ([ManufacturerID])
GO
ALTER TABLE [dbo].[Models] CHECK CONSTRAINT [FK_Models_Manufacturers]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_RentalCars_Orders] FOREIGN KEY([CarID])
REFERENCES [dbo].[Cars] ([CarID])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_RentalCars_Orders]
GO
/****** Object:  StoredProcedure [dbo].[GetAllOrdersByAdmin]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[GetAllOrdersByAdmin] (@manufacturerId int=null,@modelId int=null, @carId int=null,@UserId int=null) as
SELECT * 
FROM dbo.ShowAllOrdersDetails 
WHERE 
(ManufacturerID=@manufacturerId  or @manufacturerId is null )        
and (ModelID=@modelId  or @modelId is null)           
and (CarId=@carId  or @carId is null)
and (UserId=@UserId or @UserId is null)
order by ManufacturerName,ModelName     

GO
/****** Object:  StoredProcedure [dbo].[GetAllOrdersByUser]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[GetAllOrdersByUser] (@UserId int) as
SELECT * 
FROM dbo.ShowAllOrdersDetails 
WHERE 
UserId=@UserId
order by orderId     

GO
/****** Object:  StoredProcedure [dbo].[GetAvailableCarsBySearch]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[GetAvailableCarsBySearch] (@start date=null, @end date=null, @manufacturerId int=null,@modelId int=null, @carId int=null) as
SELECT * , ceiling(datediff(dd,@start,@end)) as [numberOfDays]
FROM dbo.ShowAllCars  
WHERE carId not in (
                      SELECT CarID
                      FROM orders
                      WHERE StartRentalDate>= @start and StartRentalDate<@end
					  or EndRentalDate> @start and EndRentalDate<=@end
					  or (StartRentalDate<@start and EndRentalDate>@end)  
					  ) 
and (ManufacturerID=@manufacturerId  or @manufacturerId is null)           
and (ModelID=@modelId  or @modelId is null)           
and (CarId=@carId  or @carId is null)
order by ManufacturerName,ModelName     

GO
/****** Object:  StoredProcedure [dbo].[GetBookedDatesFromTodayByCar]    Script Date: 04/03/2019 13:08:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetBookedDatesFromTodayByCar](@carId int)   as
SET FMTONLY OFF
begin
declare @today date=getdate();

select StartRentalDate, EndRentalDate into #TempleBookedDates from Orders 
where carID=@carId
and (StartRentalDate>=@today or (EndRentalDate>=@today and StartRentalDate<@today))

select dates.d from #TempleBookedDates t  cross apply (select d from [dbo].[GetBookedDatesTable](t.StartRentalDate,t.EndRentalDate) where d>=@today) dates 
order by d
drop table #TempleBookedDates
end

GO
USE [master]
GO
ALTER DATABASE [RentalCar] SET  READ_WRITE 
GO
