const { Client, MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu, Modal, TextInputComponent } = require("discord.js");
const client = new Client({ intents: 3276799 });

const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, 'database.json');

let database = { clans: [] };
if (fs.existsSync(databasePath)) {
    const fileContent = fs.readFileSync(databasePath);
    database = JSON.parse(fileContent);
}

const { token, prefix, categoryId } = require("./config.js");
client.once("ready", () => {
console.log("ready");
});     

client.on("messageCreate", async message => {
if(message.content === prefix + "setup"){
if(!message.member.permissions.has("ADMINISTRATOR")) return;
const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('join_clan')
                    .setLabel('دخول الى كلان')
                
                .setEmoji("📥")
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('leave_clan')
                    .setLabel('خروج من الكلان')
                
                .setEmoji("📤")
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('more_info')
                    .setLabel('المزيد من المعلومات')
                
                .setEmoji("📒")
                    .setStyle('SECONDARY')
            );
    const embed = new MessageEmbed()
    .setTitle("مرحباً بك في نظام الكلانات")
    .setDescription("نظام الكلانات هو نظام يختص بالتعرف على أصدقاء جدد و التحدث معهم بشكل فوري.\nيمكنك الدخول إلى أحد الكلانات عن طريق الضغط على زر **دخول إلى الكلان**.\nوأيضاً يمكنك الخروج من الكلان الذي أنت فيه عن طريق الضغط على زر **خروج من الكلان**.\nاتمنى منكم جميعاً قراءة جميع القوانين الكلانات عن طريق زر **المزيد من المعلومات**.")
    .setFooter(message.guild.name + " - نظام الكلانات", message.guild.iconURL({ dynamic: true }))
        await message.reply({ embeds: [embed], components: [row] });
}
});

client.on("interactionCreate", async interaction => {
if(!interaction.isButton()) return;
    if (interaction.customId === 'more_info') {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('rules')
                        .setLabel('قوانين الكلانات و العقوبات')
                    .setEmoji("🚧")
                        .setStyle('DANGER'),
                    new MessageButton()
                        .setCustomId('create_clan')
                        .setLabel('إنشاء كلان')
                    .setEmoji("🗺️")
                        .setStyle('SECONDARY')
                );
        const embed = new MessageEmbed()
        .setTitle("مرحباً بك في نظام الكلانات")
        .setDescription("نظام الكلانات هو نظام يختص بالتعرف على أصدقاء جدد والتحدث معهم بشكل فوري.\nعند تقديمك على أي كلان موجود ستحصل على رومات خاصة للكلان وأيضاً رتبة و ايموجي خاص بالكلان ، ولا تنسى يجب عليك الحفاظ على جميع القوانين الكلانات واحترام مالكين الكلانات والاستماع اليه.")
        .setFooter(interaction.guild.name + " - نظام الكلانات", interaction.guild.iconURL({ dynamic: true }))
            await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    } else if (interaction.customId === 'create_clan') {
            const modal = new Modal()
                .setCustomId('create_clan1')
                .setTitle('إنشاء كلان');
        const row = new TextInputComponent()
                        .setCustomId('clan_name')
                        .setLabel('أدخل اسم الكلان:')
                        .setStyle('SHORT')
                
        const rows = [
new MessageActionRow().addComponents(row)
]
        modal.addComponents(...rows)
            await interaction.showModal(modal);
        } else if(interaction.customId == "rules"){
const embed = new MessageEmbed()
.setTitle("قوانين الكلانات")
.setDescription("- المسؤول عن الكلان بالكامل هو الاونر ومساعدينه هو النائب لو موجود\n \n- الكلان يسبب مشاكل بالشات العام او بالرومات الصوتية ، الهجوم على الرومات وعمل سبام متكرر ، نشر ايموجيات الكلانات في الرومات العامة السيرفر.. كلها ممنوعة ، سوف يتم معابقة الكلان وممكن توصل ل حذف الكلان\n \n- سحب الأعضاء من كلانات اخرى عن طريق الخاص أو الرومات العامة في السيرفر ممنوع\n \n- ممنوع تقليل من قيمة الكلان مثل كلمات كلان ميت أو كلان سيئ أو شات ميت أو رومات ميتة أو التحدث عن كلان آخر على نحو ساخر، لديك تحذير واحد فقط\n \n- الكلانات تابع للقوانين السيرفر بشكل عام من حيث القوانين\n \n- اي مشكله يتم عقوبه الشخص واذا كررت يعاقب الكلان ب اكمله واولهم الاونر\n \n- المبالغ غير مستردة والمشاكل داخل كلان تضل داخلها\n \n- ممنوع الغش\nامثلة : ممنوع انشاء حسابات من اجل التافيك و التفاعل كل شخص له حساب واحد ، و اذا لديه حسابين ممنوع يدخلهم الاثنين و اذا تم كشف احد الاشخاص متفاعل بيتبند الشخص نفسه و حسابه الثاني و اذا تم معرفة ان اونر الكلان او احد مساعدينه يعرفون بـالموضوع و لم يتم طرد الشخص الذي جلب حسابه الاخر بيتم خصم 200 نقطة من نقاط الكلان")
.setFooter(interaction.guild.name + " - نظام الكلانات", interaction.guild.iconURL({ dynamic: true }));
            const row = new MessageActionRow()
            .addComponents(
            new MessageButton()
                .setLabel("نظام العقوبات")
                .setEmoji("📋")
                .setCustomId("warn")
                .setStyle("DANGER")
            );
            await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
} else if(interaction.customId == "warn"){
const embed = new MessageEmbed()
.setTitle("نظام العقوبات")
.setDescription(`- التحذيرات المرتفعة
الكلان الذي يسحب الأعضاء من كلان آخر إلى كلانه ، كل عملية سحب عليها تحذير مرتفع وبعد 3 عمليات سحب يتم حذف الكلان ، وكل عملية يتم إخبار مالك الكلان ، وبعد الحذف الكلان لن يتسطيع الاونر من إنشاء كلان مرة أخرى ولا أن يصبح كو أونر ولا في أي كلان آخر
- مساعدين الاونرات  إذا تم إجراء عملية سحب واحدة يتم تخفيضه وفي حال التكرار طرد مع بلاك ليست
- التحذيرات المنخفضة التي ما تم إجراء عقوبتها من قبل أونر الكلان أو كو اونرات الكلان يتم تحويل التحذير من منخفضة إلى خطيرة ولديه فقط 5 تحذيرات من هاد النوع ، وبعد 5 تحذيرات يتم خصم 500 نقطة

- التحذيرات المنخفضة
أي عضو في كلان يسوي مشاكل أو ما يحترم الكلانات الأخرى أو كان يسحب الأعضاء أو غير منفذ للقوانين السيرفر والكلانات ، يتم تحذير الشخص من مسؤولين الكلان ، وفي حال المسؤولين ما نفذوا الإجراء يتم تحويل التحذير المنخفضة إلى مرتفعة`)
.setFooter(interaction.guild.name + " - نظام الكلانات", interaction.guild.iconURL({ dynamic: true }));
    await interaction.reply({ embeds: [embed], ephemeral: true });
}
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'create_clan1') {
        const clanName = interaction.fields.getTextInputValue('clan_name');
        const guild = interaction.guild;

        const clanRole = await guild.roles.create({
            name: clanName,
            reason: 'Clan creation',
        });

        const category = await guild.channels.create(clanName, {
            type: 'GUILD_CATEGORY',
        });

        const textChannel = await guild.channels.create(`${clanName}-chat`, {
            type: 'GUILD_TEXT',
            parent: category.id,
        });

        const voiceChannel = await guild.channels.create(`${clanName}-voice`, {
            type: 'GUILD_VOICE',
            parent: category.id,
        });
        await category.permissionOverwrites.edit(guild.roles.everyone, {
            VIEW_CHANNEL: false,
        });
        await category.permissionOverwrites.edit(clanRole, {
            VIEW_CHANNEL: true,
        });

        await textChannel.permissionOverwrites.edit(guild.roles.everyone, {
            VIEW_CHANNEL: false,
        });
        await textChannel.permissionOverwrites.edit(clanRole, {
            VIEW_CHANNEL: true,
        });

        await voiceChannel.permissionOverwrites.edit(guild.roles.everyone, {
            VIEW_CHANNEL: false,
        });
        await voiceChannel.permissionOverwrites.edit(clanRole, {
            VIEW_CHANNEL: true,
        });
        await interaction.member.roles.add(clanRole);
        database.clans.push(clanName, clanRole);
        fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));

        await interaction.reply({
            content: `تم إنشاء الكلان: ${clanName}`,
            ephemeral: true,
        });
    }
});

client.on("interactionCreate", async interaction => {
if(!interaction.isButton()) return;
    if(interaction.customId == "join_clan"){
        const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            parent: categoryId,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                }
            ]
        });
        const embed = new MessageEmbed()
        .setDescription(`اهلاً ${interaction.user}, يرجى كتابة اسم الكلان الذي تريد الانضمام اليه`)
        .setFooter("By: Wick Studio");
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
        .setLabel("Close")
        .setCustomId("close")
        .setStyle("PRIMARY")
        .setEmoji("🔒")
        )
        await channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: `*ticket has been opened ${channel}*`, ephemeral: true });
} else if(interaction.customId == "leave_clan"){
const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            parent: categoryId,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                }
            ]
        });
    const embed = new MessageEmbed()
        .setDescription(`اهلاً ${interaction.user}, يرجى كتابة اسم الكلان الذي تريد الخروج منه`)
        .setFooter("By: Wick Studio");
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
        .setLabel("Close")
        .setCustomId("close")
        .setStyle("PRIMARY")
        .setEmoji("🔒")
        )
        await channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: `*ticket has been opened ${channel}*`, ephemeral: true });
} else if(interaction.customId == "close"){
await interaction.channel.delete();
}
});

client.login(token)