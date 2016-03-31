USE [LynxDelivery]
GO

/****** Object:  Table [dbo].[Outbound]    Script Date: 03/31/2016 12:56:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Outbound](
	[OutboundID] [bigint] IDENTITY(1,1) NOT NULL,
	[TruckWHID] [nchar](10) NULL,
	[FromWHID] [nchar](10) NULL,
	[DriverID] [nchar](10) NULL,
	[AddressID] [bigint] NULL,
 CONSTRAINT [PK_Outbound] PRIMARY KEY CLUSTERED 
(
	[OutboundID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Outbound Primary Key' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Outbound', @level2type=N'CONSTRAINT',@level2name=N'PK_Outbound'
GO

ALTER TABLE [dbo].[Outbound]  WITH CHECK ADD  CONSTRAINT [FK_Outbound_Address] FOREIGN KEY([AddressID])
REFERENCES [dbo].[Address] ([AddressID])
GO

ALTER TABLE [dbo].[Outbound] CHECK CONSTRAINT [FK_Outbound_Address]
GO

