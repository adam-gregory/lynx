USE [LynxDelivery]
GO

/****** Object:  Table [dbo].[Address]    Script Date: 03/31/2016 12:55:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Address](
	[AddressID] [bigint] IDENTITY(1,1) NOT NULL,
	[Street] [nvarchar](50) NULL,
	[State] [nchar](10) NULL,
	[Number] [nchar](10) NULL,
	[Zip] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Line3] [nvarchar](50) NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

